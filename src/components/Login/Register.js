import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import { white } from 'material-ui/styles/colors';
import { Title } from './index';
import InputField from './InputField';
import { transition, accentColor } from '../../styles';

const RegisterSection = glamorous.section({
  position: 'relative',
  width: 0,
  color: white,
  backgroundColor: accentColor,
  boxSizing: 'border-box',
  transition,
  overflow: 'hidden'
}, ({ open }) => {
  if (open) return { padding: 48, width: 400 };
});

const CloseButton = glamorous(IconButton)({
  position: 'absolute !important',
  top: 36,
  right: 36
});

export default class Register extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  state = {
    name: '',
    email: '',
    password: '',
    nameError: '',
    emailError: '',
    passwordError: ''
  };

  handleNameChange = e => this.setState({ name: e.target.value });
  handleEmailChange = e => this.setState({ email: e.target.value });
  handlePasswordChange = e => this.setState({ password: e.target.value });

  onRegister = () => {
    const { name, email, password } = this.state;

    if (!name.trim()) {
      this.setState({
        nameError: 'Name should be given.',
        emailError: '',
        passwordError: ''
      });
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      user.updateProfile({
        displayName: name
      });
      firebase.database().ref(`users/${user.uid}`).set({
        displayName: name,
        email: user.email,
        photoURL: user.photoURL
      });
    }).catch((error) => {
      this.setState({
        nameError: '',
        emailError: '',
        passwordError: ''
      });
      switch (error.code) {
        case 'auth/weak-password': {
          this.setState({ passwordError: error.message });
          break;
        }
        default: {
          this.setState({ emailError: error.message });
        }
      }
    });
  };

  render = () => (
    <RegisterSection open={this.props.open}>
      <CloseButton iconStyle={{ color: white }} onClick={this.props.onClose}>
        <Close />
      </CloseButton>
      <Title css={{ color: white }}>Register</Title>
      <InputField
        label="Name"
        value={this.state.name}
        onChange={this.handleNameChange}
        errorText={this.state.nameError}
        white
      />
      <InputField
        label="Email"
        value={this.state.email}
        onChange={this.handleEmailChange}
        errorText={this.state.emailError}
        white
      />
      <InputField
        label="Password"
        value={this.state.password}
        onChange={this.handlePasswordChange}
        errorText={this.state.passwordError}
        type="password"
        white
      />
      <RaisedButton
        label="Register"
        onClick={this.onRegister}
        style={{ marginTop: 12 }}
        primary
        fullWidth
      />
    </RegisterSection>
  );
}
