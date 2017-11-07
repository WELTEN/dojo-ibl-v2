import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

export default class Prompt extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    multiLine: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    emptyOnOk: PropTypes.bool,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  state = {
    input: this.props.value || '',
    error: ''
  };

  componentWillReceiveProps = (props) => {
    const value = props.value;
    if (
      typeof value !== 'undefined' &&
      value !== null &&
      value !== this.state.input
    ) {
      this.setState({ input: value });
    }
  };

  handleChange = e => this.setState({ input: e.target.value });

  onOk = () => {
    if (!this.state.input.trim()) {
      this.setState({ error: 'Value can\'t be empty' });
      return;
    }
    this.setState({ error: '' });
    this.props.onOk(this.state.input);
  };

  onCancel = () => {
    this.setState({ error: '' });
    this.props.onCancel();
  };

  render = () => {
    const props = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.onCancel}
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
        onRequestClose={this.onCancel}
      >
        {props.msg}
        <TextField
          floatingLabelText={props.label}
          hintText={props.placeholder}
          value={this.state.input}
          onChange={this.handleChange}
          errorText={this.state.error}
          multiLine={props.multiLine}
          fullWidth
        />
      </Dialog>
    );
  };
}
