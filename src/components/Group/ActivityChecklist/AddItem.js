import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { FormContainer, InputField, SubmitButton } from '../../BasicForm';
import { grey400 } from 'material-ui/styles/colors';

export default class AddItem extends Component {
  static propTypes = {
    checklist: PropTypes.string.isRequired
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

    firebase.database().ref(`checklists/${this.props.checklist}/items/`).push().set({
      checked: false,
      name
    });
    this.setState({ name: '', error: '' });
  };

  render = () => (
    <FormContainer css={{ marginBottom: this.state.error ? 24 : 12 }}>
      <InputField
        floatingLabelText="Item name"
        value={this.state.name}
        onChange={this.handleNameChange}
        errorText={this.state.error}
        underlineStyle={{ borderColor: grey400 }}
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
