import React from 'react';
import PropTypes from 'prop-types';
import GroupPhases from './GroupPhases';
import CollapsibleActivity from './CollapsibleActivity';

const GroupContent = ({ group }) => (
  <div>
    <GroupPhases group={group} />
    <CollapsibleActivity group={group} />
  </div>
);

GroupContent.propTypes = {
  group: PropTypes.object.isRequired
};

export default GroupContent;
