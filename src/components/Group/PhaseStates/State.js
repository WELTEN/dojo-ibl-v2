import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Activity from './Activity';
import { DropTarget } from 'react-dnd';
import { TODO, PROGRESS, DONE } from './StateTypes';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

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

const State = ({ state, activities, phaseKey, collapsed, connectDropTarget }) =>
  connectDropTarget(
    <div className={`state ${collapsed ? 'collapsed': ''}`}>
      <Col>
        <Title>{getStateName(state)}</Title>
        {activities.map((activity) =>
          <Activity
            activity={activity}
            phaseKey={phaseKey}
            key={activity.key}
          />
        )}
      </Col>
    </div>
  );

State.propTypes = {
  state: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  phaseKey: PropTypes.string.isRequired,
  groupKey: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};

const stateTarget = {
  drop(props, monitor) {
    const activity = monitor.getItem();
    const ref = firebase.database().ref(`groups/${props.groupKey}/states/${activity.key}`);
    if (props.state === TODO) {
      ref.remove();
    } else {
      ref.set(props.state);
    }
  }
};

const mapStateToProps = state => ({ collapsed: state.open });

export default DropTarget(
  props => props.phaseKey,
  stateTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  })
)(connect(mapStateToProps)(State));
