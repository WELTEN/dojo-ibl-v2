import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormContainer, InputField, SubmitButton } from '../../BasicForm';
import { createGroup, addCurrentUserToGroup } from '../../../lib/Firebase';

export default class AddGroup extends Component {
  static propTypes = {
    project: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    name: '',
    error: ''
  };

  handleNameChange = e => this.setState({ name: e.target.value });

  onCreate = () => {
    const name = this.state.name;
    if (!name.trim()) {
      this.setState({ error: 'Name can\'t be empty' });
      return;
    }

    const projectKey = this.props.project.key;
    const [ key, creationPromise ] = createGroup(name, projectKey);
    creationPromise.then(() => addCurrentUserToGroup(key, projectKey));
    this.setState({ name: '', error: '' });
  };

  render = () => (
    <FormContainer css={{ marginTop: 12 }}>
      <InputField
        floatingLabelText="Group name"
        value={this.state.name}
        onChange={this.handleNameChange}
        errorText={this.state.error}
        fullWidth
      />
      <SubmitButton
        label="Add"
        onClick={this.onCreate}
        primary
      />
    </FormContainer>
  );
}
