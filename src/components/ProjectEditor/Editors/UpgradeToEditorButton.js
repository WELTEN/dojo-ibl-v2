import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';

const onUpgrade = (user, projectKey) => {
  firebase.database().ref(`projects/${projectKey}/owners/${user.key}`).set(true);
  firebase.database().ref(`users/${user.key}/projects/${projectKey}`).set(true);
};

const UpgradeToEditorButton = ({ user, projectKey }) => (
  <FlatButton
    label="Upgrade to editor"
    onClick={() => onUpgrade(user, projectKey)}
    secondary
  />
);

UpgradeToEditorButton.propTypes = {
  user: PropTypes.shape({
    key: PropTypes.string.isRequired
  }).isRequired,
  projectKey: PropTypes.string.isRequired
};

export default UpgradeToEditorButton;
