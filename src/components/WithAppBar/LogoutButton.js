import React from 'react';
import glamorous from 'glamorous';
import { withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';

const Button = glamorous(FlatButton)({
  marginTop: '6px !important'
});

const logout = (history) => {
  firebase.auth().signOut();
  history.push('/');
};

const LogoutButton = ({ history }) => (
  <Button
    label="Logout"
    onClick={() => logout(history)}
  />
);

export default withRouter(LogoutButton);
