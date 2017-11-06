import React from 'react';
import PropTypes from 'prop-types';
import Activity from './Activity';

const Activities = ({ activities, phaseKey }) =>
  Object.keys(activities || {}).map((activity) =>
    <Activity
      activityKey={activity}
      phaseKey={phaseKey}
      key={activity}
    />
  );

Activities.propTypes = {
  activities: PropTypes.object.isRequired,
  phaseKey: PropTypes.string.isRequired
};

export default Activities;
