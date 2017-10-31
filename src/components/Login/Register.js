import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { red500, grey200 } from 'material-ui/styles/colors';
import { Title } from './index';

const RegisterSection = glamorous.section({
  width: 0,
  backgroundColor: grey200,
  boxSizing: 'border-box',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
}, ({ open }) => {
  if (open) return { padding: 48, width: 400 };
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
    emailError: '',
    passwordError: ''
  };

  handleNameChange = e => this.setState({ name: e.target.value });
  handleEmailChange = e => this.setState({ email: e.target.value });
  handlePasswordChange = e => this.setState({ password: e.target.value });

  onRegister = () => {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      this.setState({
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
      <Title>Register</Title>
      <TextField
        floatingLabelText="Email"
        value={this.state.email}
        onChange={this.handleEmailChange}
        errorText={this.state.emailError}
        fullWidth
      />
      <TextField
        floatingLabelText="Password"
        value={this.state.password}
        onChange={this.handlePasswordChange}
        errorText={this.state.passwordError}
        type="password"
        fullWidth
      />
      <RaisedButton
        label="Register"
        onClick={this.onRegister}
        secondary
        fullWidth
      />
    </RegisterSection>
  );
}
