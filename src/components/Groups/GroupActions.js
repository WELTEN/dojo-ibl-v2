import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import WithLoadingSpinner from '../WithLoadingSpinner';
import { red500 } from 'material-ui/styles/colors';
import * as firebase from 'firebase';
import Confirm from '../Confirm';
import injectFirebaseData from '../InjectFirebaseData';

const ActionWrapper = glamorous.div({
  display: 'flex'
}, ({ hidden }) => {
  if (hidden) return { marginLeft: -24 };
});

class GroupActions extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
    group: PropTypes.shape({
      key: PropTypes.string.isRequired,
      project: PropTypes.string.isRequired
    }).isRequired,
  };

  state = { leaving: false };

  currentUserOwnsProject = () =>
    this.props.data === firebase.auth().currentUser.uid;

  onLeave = () => this.setState({ leaving: true });

  onLeaveConfirm = () => {
    const currentUser = firebase.auth().currentUser;
    firebase.database().ref(`users/${currentUser.uid}/groups/${this.props.group.key}`).remove();
    firebase.database().ref(`groups/${this.props.group.key}/users/${currentUser.uid}`).remove();
  };

  onLeaveCancel = () => this.setState({ leaving: false });

  render = () => (
    <WithLoadingSpinner loading={this.props.loading}>
      <ActionWrapper hidden={this.currentUserOwnsProject()}>
        {!this.currentUserOwnsProject() &&
          <IconButton onClick={this.onLeave} iconStyle={{ color: red500 }}>
            <Close />
          </IconButton>
        }
      </ActionWrapper>
      <Confirm
        title="Confirm group leaving"
        msg="Are you sure you want to leave this group?"
        open={this.state.leaving}
        onOk={this.onLeaveConfirm}
        onCancel={this.onLeaveCancel}
      />
    </WithLoadingSpinner>
  );
}

const getRef = props => firebase.database().ref(`projects/${props.group.project}/owner`);

export default injectFirebaseData(GroupActions, getRef);
