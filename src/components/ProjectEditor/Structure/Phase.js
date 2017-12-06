import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import LoadingSpinner from '../../LoadingSpinner';
import Activities from './Activities';
import Prompt from '../../Prompt';
import Confirm from '../../Confirm';
import AddActivity from './AddActivity';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import injectFirebaseData from '../../InjectFirebaseData';
import PhaseHeader from './PhaseHeader';
import Aux from 'react-aux';

class Phase extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
    phaseKey: PropTypes.string.isRequired,
    previousPhase: PropTypes.string,
    nextPhase: PropTypes.string,
    index: PropTypes.number.isRequired,
    sortedPhaseKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    phases: PropTypes.object.isRequired,
    projectKey: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  };

  state = {
    editing: false,
    deleting: false
  };

  onEdit = () => this.setState({ editing: true });

  onEditSave = (name) => {
    this.setState({ editing: false });
    getRef(this.props).child('name').set(name);
  };

  onEditCancel = () => this.setState({ editing: false });

  onDelete = () => this.setState({ deleting: true });

  onDeleteConfirm = () => {
    this.setState({ deleting: false });
    const { phaseKey, projectKey } = this.props;
    firebase.database().ref(`projects/${projectKey}/phases/${phaseKey}`).remove();
    getRef(this.props).child('activities').once('value').then((snapshot) => {
      Object.keys(snapshot.val() || {}).forEach((key) => {
        firebase.database().ref(`activities/${key}`).remove();
      });
      getRef(this.props).remove();
    });
  };

  onDeleteCancel = () => this.setState({ deleting: false });

  getLastActivityIndex = () => {
    const indexes = Object.values(this.props.data.activities || {});
    return indexes.pop() || 0;
  };

  render = () => this.props.connectDropTarget(
    <div className="phase" style={{ opacity: this.props.isDragging ? .5 : 1 }}>
      {this.props.loading ? (
        <LoadingSpinner />
      ) : (
        <Aux>
          <PhaseHeader
            phase={this.props.data}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            connectDragSource={this.props.connectDragSource}
          />
          {this.props.data.activities && (
            <Activities
              activities={this.props.data.activities}
              phaseKey={this.props.phaseKey}
            />
          )}
          <AddActivity
            phaseKey={this.props.phaseKey}
            lastIndex={this.getLastActivityIndex()}
          />
          <Prompt
            title="Rename phase"
            msg="Enter a new name for the phase."
            label="Name"
            value={this.props.data.name}
            open={this.state.editing}
            onOk={this.onEditSave}
            onCancel={this.onEditCancel}
          />
          <Confirm
            title="Confirm phase deletion"
            msg="After you delete a phase, there's no way back!"
            open={this.state.deleting}
            onOk={this.onDeleteConfirm}
            onCancel={this.onDeleteCancel}
          />
        </Aux>
      )}
    </div>
  );
}

const phaseSource = {
  beginDrag: (props) => ({
    phaseKey: props.phaseKey,
    index: props.index
  })
};

const phaseTarget = {
  hover: (props, monitor, component) => {
    const {
      phaseKey,
      previousPhase,
      nextPhase,
      index,
      phases,
      sortedPhaseKeys,
      projectKey
    } = props;
    const dragPhaseKey = monitor.getItem().phaseKey;
    const dragIndex = monitor.getItem().index;

    if (dragPhaseKey === phaseKey) return;

    const draggingLeft = dragIndex > index;
    const draggingRight = dragIndex < index;

    if (draggingLeft && dragPhaseKey === previousPhase) return;
    if (draggingRight && dragPhaseKey === nextPhase) return;

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the left
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    if (draggingLeft && hoverClientX > hoverMiddleX) return;
    if (draggingRight && hoverClientX < hoverMiddleX) return;

    const previousPhaseIndex = phases[previousPhase] || 0;
    const nextPhaseIndex = phases[nextPhase] || -1;

    let newIndex = draggingLeft
      ? (index + previousPhaseIndex) / 2
      : (index + nextPhaseIndex) / 2;

    if (nextPhaseIndex === -1) {
      const lastPhaseKey = sortedPhaseKeys[sortedPhaseKeys.length - 1];
      const lastPhase = phases[lastPhaseKey];
      newIndex = lastPhase + 1;
    }

    firebase.database().ref(`projects/${projectKey}/phases/${dragPhaseKey}`).set(newIndex);
  }
};

const getRef = props => firebase.database().ref(`phases/${props.phaseKey}`);

export default DropTarget(ItemTypes.PHASE, phaseTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(ItemTypes.PHASE, phaseSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(
    injectFirebaseData(Phase, getRef)
  )
);
