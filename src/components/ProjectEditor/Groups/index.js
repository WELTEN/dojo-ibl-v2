import React from 'react';
import PropTypes from 'prop-types';
import GroupList from './GroupList';
import AddGroup from './AddGroup';

const Groups = ({ project }) => (
  <div>
    <GroupList project={project} />
    <AddGroup project={project} />
  </div>
);

Groups.propTypes = {
  project: PropTypes.object.isRequired
};

export default Groups;
