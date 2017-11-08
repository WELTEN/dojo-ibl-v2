import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import randomstring from 'randomstring';

const FormContainer = glamorous.div({
  marginTop: 10,
  display: 'flex',
  alignItems: 'center'
});

const NameField = glamorous(TextField)({
  marginTop: '-14px !important'
});

const AddButton = glamorous(RaisedButton)({ marginLeft: 24 });

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
    firebase.database().ref(`projects/${projectKey}/groups/${key}`).set(true);
    firebase.database().ref(`groups/${key}`).set({
      name: this.state.name,
      code,
      project: projectKey
    });
    firebase.database().ref(`groupCodes/${code}`).set(key);
    this.setState({ name: '', error: '' });
  };

  generateGroupCode = () =>
    randomstring.generate({ length: 6, capitalization: 'uppercase' });

  render = () => (
    <FormContainer>
      <NameField
        floatingLabelText="Group name"
        value={this.state.name}
        onChange={this.handleNameChange}
        errorText={this.state.error}
        fullWidth
      />
      <AddButton
        label="Add"
        onClick={this.onCreate}
        primary
      />
    </FormContainer>
  );
}
