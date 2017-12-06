import React from 'react';
import PropTypes from 'prop-types';
import Activity from './Activity';
import Aux from 'react-aux';

const Activities = ({ activities, phaseKey }) => {
  const sortedActivityKeys = Object.keys(activities).sort(
    (a, b) => activities[a] - activities[b]
  );

  const sortedActivities = Object.entries(activities).sort(
    (a, b) => a[1] - b[1]
  );

  return (
    <Aux>
      {sortedActivities.map(([ key, activityIndex ], index) =>
        <Activity
          activityKey={key}
          previousActivity={sortedActivityKeys[index - 1]}
          nextActivity={sortedActivityKeys[index + 1]}
          index={activityIndex}
          sortedActivityKeys={sortedActivityKeys}
          activities={activities}
          phaseKey={phaseKey}
          key={key}
        />
      )}
    </Aux>
  );
};

Activities.propTypes = {
  activities: PropTypes.object.isRequired,
  phaseKey: PropTypes.string.isRequired
};

export default Activities;
