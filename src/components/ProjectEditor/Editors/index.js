import React from 'react';
import PropTypes from 'prop-types';
import UserList from './UserList';

const Editors = ({ project }) => (
  <div>
    <UserList project={project} />
  </div>
);

Editors.propTypes = {
  project: PropTypes.object.isRequired
};

export default Editors;
