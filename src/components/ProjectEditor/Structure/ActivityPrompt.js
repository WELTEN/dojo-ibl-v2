import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

export default class ActivityPrompt extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    nameValue: PropTypes.string,
    descriptionValue: PropTypes.string,
    open: PropTypes.bool.isRequired,
    emptyOnOk: PropTypes.bool,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  state = {
    name: this.props.nameValue || '',
    description: this.props.descriptionValue || '',
    nameError: ''
  };

  handleNameChange = e => this.setState({ name: e.target.value });

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  onOk = () => {
    if (!this.state.name.trim()) {
      this.setState({ nameError: 'Name can\'t be empty.' });
      return;
    }
    this.setState({ nameError: '' });
    this.props.onOk(this.state.name, this.state.description);
    if (this.props.emptyOnOk) this.setState({ name: '', description: '' });
  };

  render = () => {
    const props = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.props.onCancel}
      />,
      <FlatButton
        label="Ok"
        primary
        onClick={this.onOk}
      />
    ];

    return (
      <Dialog
        title={props.title}
        actions={actions}
        open={props.open}
        onRequestClose={props.onCancel}
      >
        {props.msg}
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
