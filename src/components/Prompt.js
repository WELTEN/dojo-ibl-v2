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
    input: this.props.value || ''
  };

  handleChange = e => this.setState({ input: e.target.value });

  onOk = () => {
    if (!this.state.input.trim()) return this.props.onCancel();
    this.props.onOk(this.state.input);
    if (this.props.emptyOnOk) this.setState({ input: '' });
  }

  render() {
    const props = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        onClick={props.onCancel}
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
        modal={false}
        open={props.open}
        onRequestClose={props.onCancel}
      >
        {props.msg}
        <TextField
          floatingLabelText={props.label}
          hintText={props.placeholder}
          value={this.state.input}
          onChange={this.handleChange}
          multiLine={props.multiLine}
          fullWidth
        />
      </Dialog>
    );
  }
}
