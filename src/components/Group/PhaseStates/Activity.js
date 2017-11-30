import React from 'react';
import PropTypes from 'prop-types';
import { Item, Title, Description } from '../../StyledActivity';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

const handleClick = (activity, openActivity = {}, onClick) => {
  if (activity.key !== openActivity) onClick();
};

const Activity = ({ activity, connectDragSource, openActivity, onClick }) =>
  connectDragSource(
    <div>
      <Item onClick={() => handleClick(activity, openActivity, onClick)}>
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
  connectDragSource: PropTypes.func.isRequired,
  openActivity: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const activitySource = {
  beginDrag: props => props.activity
};

const mapStateToProps = state => ({ openActivity: state.openActivity });
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch({ type: 'OPEN', activity: ownProps.activity.key });
  }
});

export default DragSource(
  props => props.phaseKey,
  activitySource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity));
