import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import Dialog from 'material-ui/lib/dialog';



class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let { dispatch } = this.props;
    let { Venture } = this.props.Venture;
  }



  render(){
    return (
      <Dialog
        title=""
        modal={true}
        open={true}
      >
      <div style={{textAlign:'center'}}>
        <h1 style={{fontSize : '60px', fontFamily : 'Roboto', fontWeight:'100'}}>VΞX|DIRECTORATE</h1>
      </div>

      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Venture : state.Venture
  }
}

const Welcome = connect(mapStateToProps)(WelcomeComponent);

export default Welcome;
