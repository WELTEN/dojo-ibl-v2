import React from 'react';
import * as firebase from 'firebase';
import glamorous from 'glamorous';
import FlatButton from 'material-ui/FlatButton';

const Button = glamorous(FlatButton)({
  marginTop: '6px !important'
});

const LogoutButton = () => (
  <Button
    label="Logout"
    onClick={() => firebase.auth().signOut()}
  />
);

export default LogoutButton;
