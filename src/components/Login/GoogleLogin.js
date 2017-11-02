import React, { Component } from 'react';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';

export default class GoogleLogin extends Component {
  onLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(({ user }) => {
      firebase.database().ref(`users/${user.uid}`).set({
        displayName: user.displayName,
        email: user.email
      });
    });
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
