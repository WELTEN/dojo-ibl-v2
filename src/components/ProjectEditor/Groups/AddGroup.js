import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import randomstring from 'randomstring';
import { FormContainer, InputField, SubmitButton } from '../../BasicForm';

export default class AddGroups extends Component {
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
    if (!this.state.name.trim()) {
      this.setState({ error: 'Name can\'t be empty' });
      return;
    }
    const code = this.generateGroupCode();
    const key = firebase.database().ref('groups').push().getKey();
    const projectKey = this.props.project.key;
    Promise.all([
      firebase.database().ref(`projects/${projectKey}/groups/${key}`).set(true),
      firebase.database().ref(`groups/${key}`).set({
        name: this.state.name,
        code,
        project: projectKey,
        creationDate: Date.now()
      }),
      firebase.database().ref(`groupCodes/${code}`).set(key)
    ]).then(() => {
      this.addCurrentUserToGroup(key);
    });
    this.setState({ name: '', error: '' });
  };

  generateGroupCode = () =>
    randomstring.generate({ length: 6, capitalization: 'uppercase' });

  addCurrentUserToGroup = (key) => {
    const currentUser = firebase.auth().currentUser;
    firebase.database().ref(`users/${currentUser.uid}/groups/${key}`).set(true);
    firebase.database().ref(`groups/${key}/users/${currentUser.uid}`).set(currentUser.photoURL || false);
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
