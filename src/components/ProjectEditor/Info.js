import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

export default class Info extends Component {
  static propTypes = {
    project: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired
  };

  state = {
    title: this.props.project.title,
    description: this.props.project.description
  };

  handleTitleChange = e => this.setState({ title: e.target.value });
  handleDescription = e => this.setState({ description: e.target.value });

  render = () => (
    <div>
      <TextField
        floatingLabelText="Project title"
        value={this.state.title}
        onChange={this.handleTitleChange}
        fullWidth
      />
      <br />
      <TextField
        floatingLabelText="Project description"
        value={this.state.description}
        onChange={this.handleDescriptionChange}
        fullWidth
        rows={5}
        multiLine
      />
    </div>
  );
}
