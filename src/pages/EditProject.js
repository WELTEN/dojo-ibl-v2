import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';
import ProjectEditor from '../components/ProjectEditor';
import Aux from 'react-aux';

const EditProject = ({ match }) => (
  <Aux>
    <PageTitle>Edit project</PageTitle>
    <ProjectEditor
      projectKey={match.params.projectKey}
      withDelete
    />
  </Aux>
);

EditProject.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default EditProject;
