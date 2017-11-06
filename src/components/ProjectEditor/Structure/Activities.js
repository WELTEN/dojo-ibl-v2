import React from 'react';
import PropTypes from 'prop-types';
import Activity from './Activity';

const Activities = ({ activities }) =>
  Object.keys(activities || {}).map((activity) =>
    <Activity activityKey={activity} key={activity} />
  );

Activities.propTypes = {
  activities: PropTypes.object.isRequired
};

export default Activities;
