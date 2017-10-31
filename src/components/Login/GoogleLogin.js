import React, { Component } from 'react';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';

export default class GoogleLogin extends Component {
  onLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render = () => (
    <RaisedButton
      label="Login with Google account"
      onClick={this.onLogin}
      primary
      fullWidth
    />
  );
}
