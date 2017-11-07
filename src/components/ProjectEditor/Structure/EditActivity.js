import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase';

export default class EditActivity extends Component {
  static propTypes = {
    activity: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired,
    activityKey: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  state = {
    name: this.props.activity.name,
    description: this.props.activity.description || '',
    nameError: ''
  };

  handleNameChange = e => this.setState({ name: e.target.value });

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  onOk = () => {
    if (!this.state.name.trim()) {
      this.setState({ nameError: 'Name can\'t be empty' });
      return;
    }
    this.setState({ nameError: '' });

    firebase.database().ref(`activities/${this.props.activityKey}`).update({
      name: this.state.name,
      description: this.state.description
    });

    this.props.onClose();
  };

  render = () => {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.props.onClose}
      />,
      <FlatButton
        label="Ok"
        primary
        onClick={this.onOk}
      />
    ];

    return (
      <Dialog
        title="Edit activity"
        actions={actions}
        open={this.props.open}
        onRequestClose={this.props.onClose}
      >
        Change the activity name/description.
        <TextField
          floatingLabelText="Name"
          value={this.state.name}
          onChange={this.handleNameChange}
          errorText={this.state.nameError}
          fullWidth
        />
        <TextField
          floatingLabelText="Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          fullWidth
          rows={5}
          multiLine
        />
      </Dialog>
    );
  };
}
