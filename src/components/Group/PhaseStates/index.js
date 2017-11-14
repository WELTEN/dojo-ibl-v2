import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { TODO, PROGRESS, DONE } from './StateTypes';
import State from './State';

const Container = glamorous.section({
  marginLeft: -20,
  marginRight: -20,
  display: 'flex'
});

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
    <Container>
      <State state={TODO} activities={todo} />
      <State state={PROGRESS} activities={progress} />
      <State state={DONE} activities={done} />
    </Container>
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
