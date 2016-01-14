/* */ 
(function(process) {
  var caniuse = require('caniuse-db/data').agents;
  var path = require('path');
  var fs = require('fs');
  function uniq(array) {
    var filtered = [];
    for (var i = 0; i < array.length; i++) {
      if (filtered.indexOf(array[i]) === -1)
        filtered.push(array[i]);
    }
    return filtered;
  }
  function BrowserslistError(message) {
    this.name = 'BrowserslistError';
    this.message = message || '';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BrowserslistError);
    }
  }
  BrowserslistError.prototype = Error.prototype;
  function error(name) {
    var obj = new BrowserslistError(name);
    obj.browserslist = true;
    throw obj;
  }
  var normalize = function(versions) {
    return versions.filter(function(version) {
      return typeof version === 'string';
    });
  };
  var fillUsage = function(result, name, data) {
    for (var i in data) {
      result[name + ' ' + i] = data[i];
    }
  };
  var browserslist = function(selections, opts) {
    if (typeof opts === 'undefined')
      opts = {};
    if (typeof selections === 'undefined' || selections === null) {
      if (process.env.BROWSERSLIST) {
        selections = process.env.BROWSERSLIST;
      } else if (opts.config || process.env.BROWSERSLIST_CONFIG) {
        var file = opts.config || process.env.BROWSERSLIST_CONFIG;
        if (fs.existsSync(file) && fs.statSync(file).isFile()) {
          selections = browserslist.parseConfig(fs.readFileSync(file));
        } else {
          error('Can\'t read ' + file + ' config');
        }
      } else {
        var config = browserslist.readConfig(opts.path);
        if (config !== false) {
          selections = config;
        } else {
          selections = browserslist.defaults;
        }
      }
    }
    if (typeof selections === 'string') {
      selections = selections.split(/,\s*/);
    }
    if (opts.stats || process.env.BROWSERSLIST_STATS) {
      browserslist.usage.custom = {};
      var stats = opts.stats || process.env.BROWSERSLIST_STATS;
      if (typeof stats === 'string') {
        try {
          stats = JSON.parse(fs.readFileSync(stats));
        } catch (e) {
          error('Can\'t read ' + stats);
        }
      }
      if ('dataByBrowser' in stats) {
        stats = stats.dataByBrowser;
      }
      for (var browser in stats) {
        fillUsage(browserslist.usage.custom, browser, stats[browser]);
      }
    }
    var result = [];
    var exclude,
        query,
        match,
        array,
        used;
    selections.forEach(function(selection) {
      if (selection.trim() === '')
        return;
      exclude = false;
      used = false;
      if (selection.indexOf('not ') === 0) {
        selection = selection.slice(4);
        exclude = true;
      }
      for (var i in browserslist.queries) {
        query = browserslist.queries[i];
        match = selection.match(query.regexp);
        if (match) {
          array = query.select.apply(browserslist, match.slice(1));
          if (exclude) {
            result = result.filter(function(j) {
              return array.indexOf(j) === -1;
            });
          } else {
            result = result.concat(array);
          }
          used = true;
          break;
        }
      }
      if (!used) {
        error('Unknown browser query `' + selection + '`');
      }
    });
    return uniq(result).sort(function(name1, name2) {
      name1 = name1.split(' ');
      name2 = name2.split(' ');
      if (name1[0] === name2[0]) {
        var d = parseFloat(name2[1]) - parseFloat(name1[1]);
        if (d > 0) {
          return 1;
        } else if (d < 0) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return name1[0].localeCompare(name2[0]);
      }
    });
  };
  var normalizeVersion = function(data, version) {
    if (data.versions.indexOf(version) !== -1) {
      return version;
    } else {
      var alias = browserslist.versionAliases[data.name][version];
      if (alias)
        return alias;
    }
  };
  browserslist.data = {};
  browserslist.usage = {
    global: {},
    custom: null
  };
  browserslist.defaults = ['> 1%', 'last 2 versions', 'Firefox ESR'];
  browserslist.major = ['safari', 'opera', 'ios_saf', 'ie_mob', 'ie', 'edge', 'firefox', 'chrome'];
  browserslist.aliases = {
    fx: 'firefox',
    ff: 'firefox',
    ios: 'ios_saf',
    explorer: 'ie',
    blackberry: 'bb',
    explorermobile: 'ie_mob',
    operamini: 'op_mini',
    operamobile: 'op_mob',
    chromeandroid: 'and_chr',
    firefoxandroid: 'and_ff'
  };
  browserslist.versionAliases = {};
  browserslist.byName = function(name) {
    name = name.toLowerCase();
    name = browserslist.aliases[name] || name;
    return browserslist.data[name];
  };
  browserslist.checkName = function(name) {
    var data = browserslist.byName(name);
    if (!data)
      error('Unknown browser ' + name);
    return data;
  };
  browserslist.readConfig = function(from) {
    if (from === false)
      return false;
    if (!fs.readFileSync)
      return false;
    if (typeof from === 'undefined')
      from = '.';
    var dirs = path.resolve(from).split(path.sep);
    var config;
    while (dirs.length) {
      config = dirs.concat(['browserslist']).join(path.sep);
      if (fs.existsSync(config) && fs.statSync(config).isFile()) {
        return browserslist.parseConfig(fs.readFileSync(config));
      }
      dirs.pop();
    }
    return false;
  };
  browserslist.parseConfig = function(string) {
    return string.toString().replace(/#[^\n]*/g, '').split(/\n/).map(function(i) {
      return i.trim();
    }).filter(function(i) {
      return i !== '';
    });
  };
  browserslist.queries = {
    lastVersions: {
      regexp: /^last (\d+) versions?$/i,
      select: function(versions) {
        var selected = [];
        browserslist.major.forEach(function(name) {
          var data = browserslist.byName(name);
          if (!data)
            return;
          var array = data.released.slice(-versions);
          array = array.map(function(v) {
            return data.name + ' ' + v;
          });
          selected = selected.concat(array);
        });
        return selected;
      }
    },
    lastByBrowser: {
      regexp: /^last (\d+) (\w+) versions?$/i,
      select: function(versions, name) {
        var data = browserslist.checkName(name);
        return data.released.slice(-versions).map(function(v) {
          return data.name + ' ' + v;
        });
      }
    },
    globalStatistics: {
      regexp: /^> (\d+\.?\d*)%$/,
      select: function(popularity) {
        popularity = parseFloat(popularity);
        var result = [];
        for (var version in browserslist.usage.global) {
          if (browserslist.usage.global[version] > popularity) {
            result.push(version);
          }
        }
        return result;
      }
    },
    customStatistics: {
      regexp: /^> (\d+\.?\d*)% in my stats$/,
      select: function(popularity) {
        popularity = parseFloat(popularity);
        var result = [];
        var usage = browserslist.usage.custom;
        if (!usage) {
          error('Custom usage data was not provided. ' + 'To use selection "> ' + popularity + '% in my stats" ' + 'you need one of the following:\n' + '* browserslist("selections", ' + '{stats: "path/to/the/stats_file.json"})\n' + '* browserslist("selections", {stats: <stats object>})\n' + '* Set the ENV variable BROWSERSLIST_STATS to the path ' + 'of the stats JSON file.\nThe expected stats object is: ' + '{"browser": {"version": <percentage>, "anotherVersion"' + ': <percentage>, ...}, "anotherBrowser": {...}, ...}');
        }
        for (var version in usage) {
          if (usage[version] > popularity) {
            result.push(version);
          }
        }
        return result;
      }
    },
    countryStatistics: {
      regexp: /^> (\d+\.?\d*)% in (\w\w)$/,
      select: function(popularity, country) {
        popularity = parseFloat(popularity);
        country = country.toUpperCase();
        var result = [];
        var usage = browserslist.usage[country];
        if (!usage) {
          usage = {};
          var data = require('caniuse-db/region-usage-json/' + country);
          for (var i in data.data) {
            fillUsage(usage, i, data.data[i]);
          }
          browserslist.usage[country] = usage;
        }
        for (var version in usage) {
          if (usage[version] > popularity) {
            result.push(version);
          }
        }
        return result;
      }
    },
    range: {
      regexp: /^(\w+) ([\d\.]+)-([\d\.]+)/i,
      select: function(name, from, to) {
        var data = browserslist.checkName(name);
        from = parseFloat(normalizeVersion(data, from) || from);
        to = parseFloat(normalizeVersion(data, to) || to);
        var filter = function(v) {
          var parsed = parseFloat(v);
          return parsed >= from && parsed <= to;
        };
        return data.released.filter(filter).map(function(v) {
          return data.name + ' ' + v;
        });
      }
    },
    versions: {
      regexp: /^(\w+) (>=?|<=?)\s*([\d\.]+)/,
      select: function(name, sign, version) {
        var data = browserslist.checkName(name);
        var alias = normalizeVersion(data, version);
        if (alias) {
          version = alias;
        }
        version = parseFloat(version);
        var filter;
        if (sign === '>') {
          filter = function(v) {
            return parseFloat(v) > version;
          };
        } else if (sign === '>=') {
          filter = function(v) {
            return parseFloat(v) >= version;
          };
        } else if (sign === '<') {
          filter = function(v) {
            return parseFloat(v) < version;
          };
        } else if (sign === '<=') {
          filter = function(v) {
            return parseFloat(v) <= version;
          };
        }
        return data.released.filter(filter).map(function(v) {
          return data.name + ' ' + v;
        });
      }
    },
    esr: {
      regexp: /^(firefox|ff|fx) esr$/i,
      select: function() {
        return ['firefox 38'];
      }
    },
    direct: {
      regexp: /^(\w+) ([\d\.]+)$/,
      select: function(name, version) {
        var data = browserslist.checkName(name);
        var alias = normalizeVersion(data, version);
        if (alias) {
          version = alias;
        } else {
          if (version.indexOf('.') === -1) {
            alias = version + '.0';
          } else if (/\.0$/.test(version)) {
            alias = version.replace(/\.0$/, '');
          }
          alias = normalizeVersion(data, alias);
          if (alias) {
            version = alias;
          } else {
            error('Unknown version ' + version + ' of ' + name);
          }
        }
        return [data.name + ' ' + version];
      }
    }
  };
  (function() {
    for (var name in caniuse) {
      browserslist.data[name] = {
        name: name,
        versions: normalize(caniuse[name].versions),
        released: normalize(caniuse[name].versions.slice(0, -3))
      };
      fillUsage(browserslist.usage.global, name, caniuse[name].usage_global);
      browserslist.versionAliases[name] = {};
      for (var i = 0; i < caniuse[name].versions.length; i++) {
        if (!caniuse[name].versions[i])
          continue;
        var full = caniuse[name].versions[i];
        if (full.indexOf('-') !== -1) {
          var interval = full.split('-');
          for (var j = 0; j < interval.length; j++) {
            browserslist.versionAliases[name][interval[j]] = full;
          }
        }
      }
    }
  }());
  module.exports = browserslist;
})(require('process'));
