import React from 'react';
import PropTypes from 'prop-types';
import LiveUpdatingTextField from '../LiveUpdatingTextField';
import * as firebase from 'firebase';

const getProjectRef = key => firebase.database().ref(`projects/${key}`);

const Info = ({ project }) => (
  <div>
    <LiveUpdatingTextField
      floatingLabelText="Project title"
      value={project.title}
      getRef={() => getProjectRef(project.key).child('title')}
      fullWidth
    />
    <LiveUpdatingTextField
      floatingLabelText="Project description"
      value={project.description}
      getRef={() => getProjectRef(project.key).child('description')}
      fullWidth
      rows={5}
      multiLine
    />
  </div>
);

Info.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired
};

export default Info;
