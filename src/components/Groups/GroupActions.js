import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import { red500 } from 'material-ui/styles/colors';
import * as firebase from 'firebase';
import Confirm from '../Confirm';
import Aux from 'react-aux';

const ActionWrapper = glamorous.div({ display: 'flex' });

class GroupActions extends Component {
  static propTypes = {
    group: PropTypes.shape({
      key: PropTypes.string.isRequired,
      project: PropTypes.string.isRequired
    }).isRequired,
  };

  state = { leaving: false };

  onLeave = () => this.setState({ leaving: true });

  onLeaveConfirm = () => {
    const currentUser = firebase.auth().currentUser;
    firebase.database().ref(`projects/${this.props.group.project}/users/${currentUser.uid}`).remove();
    firebase.database().ref(`users/${currentUser.uid}/groups/${this.props.group.key}`).remove();
    firebase.database().ref(`groups/${this.props.group.key}/users/${currentUser.uid}`).remove();
  };

  onLeaveCancel = () => this.setState({ leaving: false });

  render = () => (
    <Aux>
      <ActionWrapper>
        <IconButton onClick={this.onLeave} iconStyle={{ color: red500 }}>
          <Close />
        </IconButton>
      </ActionWrapper>
      <Confirm
        title="Confirm group leaving"
        msg="Are you sure you want to leave this group?"
        open={this.state.leaving}
        onOk={this.onLeaveConfirm}
        onCancel={this.onLeaveCancel}
      />
    </Aux>
  );
}

export default GroupActions;
