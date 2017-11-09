import React from 'react';
import PropTypes from 'prop-types';
import WithLoadingSpinner from '../WithLoadingSpinner';
import NotFoundTitle from '../NotFoundTitle';
import * as firebase from 'firebase';
import Project from './Project';
import injectFirebaseData from '../InjectFirebaseData';

const getProjectList = projects => Object.keys(projects || {});

const ProjectList = ({ loading, data }) => (
  <WithLoadingSpinner loading={loading}>
    {getProjectList(data).length === 0 ? (
      <NotFoundTitle>{`You don't have any projects`}</NotFoundTitle>
    ) : (
      getProjectList(data).map((project) =>
        <Project projectKey={project} key={project} />
      )
    )}
  </WithLoadingSpinner>
);

ProjectList.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any
};

const getRef = (props, currentUser) =>
  firebase.database().ref(`users/${currentUser.uid}/projects`);

export default injectFirebaseData(ProjectList, getRef);
