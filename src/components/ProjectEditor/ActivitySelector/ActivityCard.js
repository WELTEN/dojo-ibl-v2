import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import ActivityCardContent from './ActivityCardContent';
import * as firebase from 'firebase';

const activityCardSource = {
  beginDrag: (props) => ({
    activity: props.activity,
    index: props.index
  })
};

const activityCardTarget = {
  hover: (props, monitor, component) => {
    const {
      activity,
      previousActivity,
      nextActivity,
      index,
      activities,
      sortedActivityKeys
    } = props;
    const dragActivity = monitor.getItem().activity;
    const dragIndex = monitor.getItem().index;

    if (dragActivity === activity) return;

    const draggingDown = dragIndex < index;
    const draggingUp = dragIndex > index;

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (draggingDown && hoverClientY < hoverMiddleY) return;
    if (draggingUp && hoverClientY > hoverMiddleY) return;

    const previousActivityIndex = activities[previousActivity] || 0;
    const nextActivityIndex = activities[nextActivity] || -1;

    let newIndex = draggingUp
      ? (index + previousActivityIndex) / 2
      : (index + nextActivityIndex) / 2;

    if (nextActivityIndex === -1) {
      const lastActivityKey = sortedActivityKeys[sortedActivityKeys.length - 1];
      const lastActivity = activities[lastActivityKey];
      newIndex = lastActivity + 1;
    }

    firebase.database().ref(`childActivities/${props.childActivitiesKey}/${dragActivity}`).set(newIndex);
    monitor.getItem().index = newIndex;
  }
};

const ActivityCard = ({ activity, isDragging, connectDragSource, connectDropTarget }) =>
  connectDragSource(
    connectDropTarget(
      <div style={{ opacity: isDragging ? 0 : 1 }}>
        <ActivityCardContent activity={activity} />
      </div>
    )
  );

ActivityCard.propTypes = {
  activity: PropTypes.string.isRequired,
  previousActivity: PropTypes.string,
  nextActivity: PropTypes.string,
  index: PropTypes.number.isRequired,
  sortedActivityKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  activities: PropTypes.object.isRequired,
  childActivitieskey: PropTypes.string,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(ItemTypes.ACTIVITY_CARD, activityCardTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(ItemTypes.ACTIVITY_CARD, activityCardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(ActivityCard)
);
