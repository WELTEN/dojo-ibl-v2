import React from 'react';
import PropTypes from 'prop-types';
import { Item, Title, Description } from '../../StyledActivity';
import { DragSource } from 'react-dnd';

const Activity = ({ activity, connectDragSource }) =>
  connectDragSource(
    <div>
      <Item onClick={() => {}}>
        <Title>{activity.name}</Title>
        {activity.description &&
          <Description>
            {activity.description}
          </Description>
        }
      </Item>
    </div>
  );

Activity.propTypes = {
  activity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  phaseKey: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

const activitySource = {
  beginDrag: props => props.activity
};

export default DragSource(
  props => props.phaseKey,
  activitySource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
)(Activity);
