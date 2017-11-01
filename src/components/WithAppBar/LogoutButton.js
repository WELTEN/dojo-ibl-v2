import React from 'react';
import * as firebase from 'firebase';
import glamorous from 'glamorous';
import FlatButton from 'material-ui/FlatButton';
import { white } from 'material-ui/styles/colors';

const Button = glamorous(FlatButton)({
  marginTop: '6px !important'
});

const LogoutButton = () => (
  <Button
    label="Logout"
    onClick={() => firebase.auth().signOut()}
    labelStyle={{ color: white }}
  />
);

export default LogoutButton;
