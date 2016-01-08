'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.Contracts
 * @description
 * # Contracts
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('Contracts', function ($q, ethereum) {
    // Service logic
    // ...
    var async = require('async');
    var db = new PouchDB('contracts');


    // Public API here
    return {
      db : db,
      get : function(contract){
        return $q(function(resolve, reject){
          db.get(contract).then(function(contract){
            resolve(contract);
          }).catch(function(error){
            reject(error);
          });
        })
      },
      save: function (contracts) {
        return $q(function(resolve, reject){
          async.forEach(contracts, function(contract,callback){
              
              var cName = Object.keys(contract.compiled.contracts)[0];
              db.put({
                _id : cName,
                compiled : contract.compiled.contracts[cName]
              }).then(function(){
                callback();  
              }).catch(function(error){
                reject(error);
              });
            }, function(err){
              // if any of the saves produced an error, err would equal that error
              if(err){
                reject(err);
              }else{
                db.allDocs({include_docs: true, revs: true}).then(function(docs){
                  resolve(docs);
                }).catch(function(error){
                  reject(error);
                });
              }
            });
        })
      },
      destroy : function(){
        return $q(function(resolve, reject){
          db.destroy().then(function(response){
            db = new PouchDB('contracts');
            resolve();
          }).catch(function(error){
            reject();
          })
        });
      },
      deploy : function(contract){
        return $q(function(resolve, reject){
          resolve(contract);
        })
      }
    };
  });