import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Activity from './Activity';
import { TODO, PROGRESS, DONE } from './StateTypes';

const Col = glamorous.section({
  position: 'relative',
  paddingTop: 12,
  paddingLeft: 20,
  paddingRight: 20,
  width: '100%',
  boxSizing: 'border-box'
});

const Title = glamorous.h4({
  marginTop: 0,
  marginBottom: 12,
  fontSize: 18
});

const getStateName = (state) => {
  switch (state) {
    case TODO: return 'Todo';
    case PROGRESS: return 'In progress';
    case DONE: return 'Done';
    default: return '';
  }
};

const State = ({ state, activities }) => (
  <div className="phase">
    <Col>
      <Title>{getStateName(state)}</Title>
      {activities.map((activity) =>
        <Activity
          activity={activity}
          key={activity.key}
        />
      )}
    </Col>
  </div>
);

State.propTypes = {
  state: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default State;
