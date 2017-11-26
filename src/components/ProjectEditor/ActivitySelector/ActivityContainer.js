import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ActivityCard from './ActivityCard';

class ActivityContainer extends Component {
  static propTypes = {
    childActivities: PropTypes.object,
    childActivitiesKey: PropTypes.string.isRequired
  };

  render = () => {
    const activities = this.props.childActivities;

    const sortedActivityKeys = Object.keys(activities || {}).sort(
      (a, b) => activities[a] - activities[b]
    );

    const sortedActivities = Object.entries(activities || {}).sort(
      (a, b) => a[1] - b[1]
    );

    return (
      <div style={{ width: '100%' }}>
        {sortedActivities.map(([ key, activityIndex ], i) => (
          <ActivityCard
            activity={key}
            previousActivity={sortedActivityKeys[i - 1]}
            nextActivity={sortedActivityKeys[i + 1]}
            index={activityIndex}
            sortedActivityKeys={sortedActivityKeys}
            activities={activities}
            childActivitiesKey={this.props.childActivitiesKey}
            key={key}
          />
        ))}
      </div>
    );
  };
}

export default DragDropContext(HTML5Backend)(ActivityContainer);
