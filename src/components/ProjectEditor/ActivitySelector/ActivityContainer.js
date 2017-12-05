import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import ActivityCard from './ActivityCard';

const Container = glamorous.div({ marginBottom: -12 });

class ActivityContainer extends Component {
  static propTypes = {
    childActivities: PropTypes.object,
    childActivitiesKey: PropTypes.string.isRequired
  };

  render = () => {
    const activities = this.props.childActivities || {};

    const sortedActivityKeys = Object.keys(activities).sort(
      (a, b) => activities[a] - activities[b]
    );

    const sortedActivities = Object.entries(activities).sort(
      (a, b) => a[1] - b[1]
    );

    return (
      <Container>
        {sortedActivities.map(([ key, activityIndex ], index) => (
          <ActivityCard
            activity={key}
            previousActivity={sortedActivityKeys[index - 1]}
            nextActivity={sortedActivityKeys[index + 1]}
            index={activityIndex}
            sortedActivityKeys={sortedActivityKeys}
            activities={activities}
            childActivitiesKey={this.props.childActivitiesKey}
            key={key}
          />
        ))}
      </Container>
    );
  };
}

export default ActivityContainer;
