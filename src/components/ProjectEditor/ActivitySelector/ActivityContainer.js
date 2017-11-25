import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ActivityCard from './ActivityCard';

class ActivityContainer extends Component {
  state = {
    activities: {
      a: 1,
      b: 4,
      c: 3,
      d: 5,
      e: 7,
      f: 6,
      g: 2
    }
  };

  updateActivityIndex = (id, index) => {
    const activities = this.state.activities;
    if (activities[id]) activities[id] = index;
    this.setState({ activities });
  };

  render = () => {
    const activities = this.state.activities;

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
            updateActivityIndex={this.updateActivityIndex}
            key={key}
          />
        ))}
      </div>
    );
  };
}

export default DragDropContext(HTML5Backend)(ActivityContainer);
