import React from 'react';
import PropTypes from 'prop-types';
import NotFoundTitle from '../NotFoundTitle';
import * as firebase from 'firebase';

const currentUserHasAccess = (project) => {
  const currentUser = firebase.auth().currentUser.uid;
  return !!project.owners[currentUser];
};

const AccessVerifier = ({ project, children }) => {
  if (currentUserHasAccess(project)) return children;
  return <NotFoundTitle>{`Project doesn't exist`}</NotFoundTitle>;
};

AccessVerifier.propTypes = {
  project: PropTypes.shape({
    owners: PropTypes.object
  }).isRequired,
  children: PropTypes.node
};

export default AccessVerifier;
