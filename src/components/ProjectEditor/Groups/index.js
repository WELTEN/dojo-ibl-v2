import React from 'react';
import PropTypes from 'prop-types';
import AddGroup from './AddGroup';

const Groups = ({ project }) => (
  <div>
    <AddGroup project={project} />
  </div>
);

Groups.propTypes = {
  project: PropTypes.object.isRequired
};

export default Groups;
