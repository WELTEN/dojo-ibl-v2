import React from 'react';
import PropTypes from 'prop-types';
import { PROGRESS, DONE } from './StateTypes';

const getActivitiesForStates = (activities, states) => {
  if (!states) return {
    todo: activities,
    progress: [],
    done: []
  };

  const todo = [];
  const progress  = [];
  const done = [];
  activities.forEach((activity) => {
    const activityState = states[activity.key];
    switch (activityState) {
      case DONE: {
        done.push(activity);
        break;
      }
      case PROGRESS: {
        progress.push(activity);
        break;
      }
      default: {
        todo.push(activity);
      }
    }
  });
  return { todo, progress, done };
};

const PhaseStates = ({ activities, group }) => {
  const {
    todo,
    progress,
    done
  } = getActivitiesForStates(activities, group.states);

  return (
    <div>
      <div>{JSON.stringify(todo)}</div>
      <div>{JSON.stringify(progress)}</div>
      <div>{JSON.stringify(done)}</div>
    </div>
  );
};

PhaseStates.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired
  })).isRequired,
  group: PropTypes.shape({
    states: PropTypes.object
  }).isRequired
};

export default PhaseStates;
