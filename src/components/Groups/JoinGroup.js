import React, { Component } from 'react';
import * as firebase from 'firebase';
import { FormContainer, InputField, SubmitButton } from '../BasicForm';
import { addCurrentUserToGroup } from '../../lib/Firebase';

export default class JoinGroup extends Component {
  state = {
    code: '',
    error: ''
  };

  handleCodeChange = (e) => {
    const value = e.target.value;
    if (this.removeHashtag(value).length > 6) return;
    this.setState({ code: value.toUpperCase() });
  };

  removeHashtag = (code) =>
    code.startsWith('#') ? code.slice(1, code.length) : code;

  onJoin = () => {
    const code = this.removeHashtag(this.state.code).trim();
    if (code.length < 6) {
      this.setState({ error: 'Code must be at least 6 characters.' });
      return;
    }

    firebase.database().ref(`groupCodes/${code}`).once('value').then((snapshot) => {
      const groupKey = snapshot.val();
      if (!groupKey) {
        this.setState({ error: 'No group with that code could be found.' });
        return;
      }

      return firebase.database().ref(`groups/${groupKey}`).once('value');
    }).then((snapshot) => {
      if (!snapshot) return;
      const groupKey = snapshot.key;
      const group = snapshot.val();
      if (!group) {
        this.setState({ error: 'The group doesn\'t exist.' });
        return;
      }

      const currentUser = firebase.auth().currentUser;
      return Promise.all([
        firebase.database().ref(`users/${currentUser.uid}/groups/${groupKey}`).once('value'),
        groupKey
      ]);
    }).then((data) => {
      if (!data) return;
      const [ snapshot, groupKey ] = data;
      const userInGroup = snapshot.val();
      if (userInGroup) {
        this.setState({ error: 'Group is already joined.' });
        return;
      }

      return Promise.all([
        firebase.database().ref(`groups/${groupKey}/project`).once('value'),
        groupKey
      ]);
    }).then((data) => {
      if (!data) return;
      const [ snapshot, groupKey ] = data;
      const projectKey = snapshot.val();

      addCurrentUserToGroup(groupKey, projectKey)

      this.setState({
        code: '',
        error: ''
      });
    });
  };

  render = () => (
    <FormContainer css={{ marginBottom: this.state.error ? 24 : 12 }}>
      <InputField
        floatingLabelText="Group code"
        value={this.state.code}
        onChange={this.handleCodeChange}
        errorText={this.state.error}
        fullWidth
      />
      <SubmitButton
        label="Join"
        onClick={this.onJoin}
        primary
      />
    </FormContainer>
  );
}
