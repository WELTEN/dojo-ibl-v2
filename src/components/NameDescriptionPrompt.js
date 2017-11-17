import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const ContentBeforeInputs = glamorous.div({ marginTop: 14 });

export default class NameDescriptionPrompt extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    nameValue: PropTypes.string,
    descriptionValue: PropTypes.string,
    open: PropTypes.bool.isRequired,
    emptyOnOk: PropTypes.bool,
    contentBeforeInputs: PropTypes.func,
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
    const { name, description } = this.state;
    if (!name.trim()) {
      this.setState({ nameError: 'Name can\'t be empty.' });
      return;
    }
    this.setState({ nameError: '' });
    this.props.onOk(name, description);
    if (this.props.emptyOnOk) this.setState({ name: '', description: '' });
  };

  onCancel = () => {
    this.setState({
      name: this.props.nameValue || '',
      description: this.props.descriptionValue || '',
      nameError: ''
    });
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
        autoScrollBodyContent
      >
        {props.msg}
        {props.contentBeforeInputs &&
          <ContentBeforeInputs>
            {props.contentBeforeInputs()}
          </ContentBeforeInputs>
        }
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
