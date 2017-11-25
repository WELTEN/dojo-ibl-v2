import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { Item, Title, Description } from '../../StyledActivity';

const activityCardSource = {
  beginDrag(props) {
    return {
      activity: props.activity,
      previousActivity: props.previousActivity,
      index: props.index
    };
  }
};

const activityCardTarget = {
  hover: (props, monitor, component) => {
    const {
      activity,
      previousActivity,
      nextActivity,
      index,
      activities,
      sortedActivityKeys,
      updateActivityIndex
    } = props;
    const dragActivity = monitor.getItem().activity;
    const dragIndex = monitor.getItem().index;

    if (dragActivity === activity) return;

    const draggingDown = dragIndex < index;
    const draggingUp = dragIndex > index;

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical mactivitydle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (draggingDown && hoverClientY < hoverMiddleY) return;

    // Dragging upwards
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

    updateActivityIndex(dragActivity, newIndex);
    monitor.getItem().index = newIndex;
  }
};

const ActivityCard = ({ activity, isDragging, connectDragSource, connectDropTarget }) =>
  connectDragSource(
    connectDropTarget(
      <div style={{ opacity: isDragging ? 0 : 1 }}>
        <Item draggable>
          <Title>{activity}</Title>
        </Item>
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
  updateActivityIndex: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget(ItemTypes.ACTIVITYCARD, activityCardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(ItemTypes.ACTIVITYCARD, activityCardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(ActivityCard)
);
