import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import * as firebase from 'firebase';
import ActivityPrompt from './ActivityPrompt';

const ButtonContainer = glamorous.footer({ textAlign: 'center' });

export default class AddActivity extends Component {
  static propTypes = {
    phaseKey: PropTypes.string.isRequired
  };

  state = { open: false };

  onOpen = () => this.setState({ open: true });

  onSave = (name, description) => {
    this.setState({ open: false });
    const key = firebase.database().ref('activities').push().getKey();
    firebase.database().ref(`phases/${this.props.phaseKey}/activities/${key}`).set(true);
    firebase.database().ref(`activities/${key}`).set({ name, description });
  };

  onClose = () => this.setState({ open: false });

  render = () => (
    <ButtonContainer>
      <IconButton onClick={this.onOpen}>
        <Add />
      </IconButton>
      <ActivityPrompt
        title="Add an activity"
        msg="Enter a name and/or a description for the new activity."
        open={this.state.open}
        emptyOnOk
        onOk={this.onSave}
        onCancel={this.onClose}
      />
    </ButtonContainer>
  );
}
