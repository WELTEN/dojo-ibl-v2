import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';

const onDowngrade = (user, projectKey) => {
  firebase.database().ref(`projects/${projectKey}/owners/${user.key}`).remove();
  firebase.database().ref(`users/${user.key}/projects/${projectKey}`).remove();
  firebase.database().ref(`projects/${projectKey}/users/${user.key}`).set(true);
};

const DowngradeToUserButton = ({ user, projectKey }) => (
  <FlatButton
    label="Downgrade to user"
    onClick={() => onDowngrade(user, projectKey)}
    disabled={user.key === firebase.auth().currentUser.uid}
    secondary
  />
);

DowngradeToUserButton.propTypes = {
  user: PropTypes.shape({
    key: PropTypes.string.isRequired
  }).isRequired,
  projectKey: PropTypes.string.isRequired
};

export default DowngradeToUserButton;
