import React, { Component } from 'react';
import HeaderLanding from '../common/HeaderLanding';

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

class LandingLex extends Component {
  state = { loginMessage: null }
  
  render () {
    let wrapperClass = "gray-bg " + this.props.location.pathname;
    return (
      <div id="wrapper">
        <HeaderLanding />

      </div>
    )
  }
}

export default LandingLex
