import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import { grey300, red500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Close from 'material-ui/svg-icons/navigation/close';
import Activities from './Activities';
import Prompt from '../../Prompt';
import Confirm from '../../Confirm';
import AddActivity from './AddActivity';
import injectFirebaseData from '../../InjectFirebaseData';

const Item = glamorous.div({
  marginTop: 24,
  marginBottom: 24,
  paddingLeft: 12,
  paddingRight: 12,
  width: 'calc(25% - 26px)',
  borderRight: `2px solid ${grey300}`,
  ':last-child': {
    borderRight: 0
  }
});

const Header = glamorous.header({
  marginTop: -10,
  marginBottom: 2,
  display: 'flex',
  alignItems: 'center'
});

const Title = glamorous.h3({
  margin: 0,
  maxWidth: 'calc(100% - 96px)',
  fontSize: 20,
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

const getRef = props => firebase.database().ref(`phases/${props.phaseKey}`);

class Phase extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
    phaseKey: PropTypes.string.isRequired,
    projectKey: PropTypes.string.isRequired
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

  render = () => (
    <Item>
      <WithLoadingSpinner loading={this.props.loading}>
        <Header>
          <Title>{this.props.data.name}</Title>
          <IconButton onClick={this.onEdit}>
            <Edit />
          </IconButton>
          <IconButton iconStyle={{ color: red500 }} onClick={this.onDelete}>
            <Close />
          </IconButton>
        </Header>
        {this.props.data.activities && (
          <Activities
            activities={this.props.data.activities}
            phaseKey={this.props.phaseKey}
          />
        )}
        <AddActivity phaseKey={this.props.phaseKey} />
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
      </WithLoadingSpinner>
    </Item>
  );
}

export default injectFirebaseData(Phase, getRef);
