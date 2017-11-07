import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import * as firebase from 'firebase';
import Aux from 'react-aux';
import Prompt from '../../Prompt';

const AddButton = glamorous(IconButton)({ marginTop: '12px !important' });

export default class AddPhase extends Component {
  static propTypes = {
    projectKey: PropTypes.string.isRequired
  };

  state = { open: false };

  onOpen = () => this.setState({ open: true });

  onSave = (name) => {
    this.setState({ open: false });
    const key = firebase.database().ref('phases').push().getKey();
    firebase.database().ref(`projects/${this.props.projectKey}/phases/${key}`).set(true);
    firebase.database().ref(`phases/${key}`).set({ name });
  };

  onClose = () => this.setState({ open: false });

  render = () => (
    <Aux>
      <AddButton onClick={this.onOpen}>
        <Add />
      </AddButton>
      <Prompt
        title="Add a phase"
        msg="Enter a name for the new phase."
        label="Name"
        open={this.state.open}
        emptyOnOk
        onOk={this.onSave}
        onCancel={this.onClose}
      />
    </Aux>
  );
}
