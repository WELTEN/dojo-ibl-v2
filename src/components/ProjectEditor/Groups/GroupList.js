import React from 'react';
import PropTypes from 'prop-types';
import Group from './Group';

const GroupList = ({ project }) => (
  <div>
    {Object.keys(project.groups || {}).map((group) =>
      <Group groupKey={group} projectKey={project.key} key={group} />
    )}
  </div>
);

GroupList.propTypes = {
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
    groups: PropTypes.object
  }).isRequired
};

export default GroupList;
