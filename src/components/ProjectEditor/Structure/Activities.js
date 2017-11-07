import React from 'react';
import PropTypes from 'prop-types';
import Activity from './Activity';
import AddActivity from './AddActivity';
import Aux from 'react-aux';

const Activities = ({ activities, phaseKey }) => (
  <Aux>
    {Object.keys(activities || {}).map((activity) =>
      <Activity
        activityKey={activity}
        phaseKey={phaseKey}
        key={activity}
      />
    )}
    <AddActivity phaseKey={phaseKey} />
  </Aux>
);

Activities.propTypes = {
  activities: PropTypes.object.isRequired,
  phaseKey: PropTypes.string.isRequired
};

export default Activities;
