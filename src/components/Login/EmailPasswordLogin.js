import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import { red500, grey500 } from 'material-ui/styles/colors';
import Link from '../Link';
import InputField from './InputField';

const BottomText = glamorous.div({
  marginTop: 12,
  fontSize: 12
});

const ErrorText = glamorous(BottomText)({
  color: red500
});

const NoAccount = glamorous(BottomText)({
  marginBottom: 12,
  color: grey500
});

export default class EmailPasswordLogin extends Component {
  static propTypes = {
    onRegisterOpen: PropTypes.func.isRequired
  };

  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    error: ''
  };

  handleEmailChange = e => this.setState({ email: e.target.value });
  handlePasswordChange = e => this.setState({ password: e.target.value });

  onLogin = () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      this.setState({
        emailError: '',
        passwordError: '',
        error: ''
      });
      switch (error.code) {
        case 'auth/invalid-email': {
          this.setState({ emailError: error.message });
          break;
        }
        case 'auth/wrong-password': {
          this.setState({ passwordError: error.message });
          break;
        }
        default: {
          this.setState({ error: error.message });
        }
      }
    });
  };

  render = () => (
    <div>
      <InputField
        label="Email"
        value={this.state.email}
        onChange={this.handleEmailChange}
        errorText={this.state.emailError}
      />
      <InputField
        label="Password"
        value={this.state.password}
        onChange={this.handlePasswordChange}
        errorText={this.state.passwordError}
        type="password"
      />
      <RaisedButton
        label="Login"
        onClick={this.onLogin}
        style={{ marginTop: 12 }}
        secondary
        fullWidth
      />
      {this.state.error &&
        <ErrorText>{this.state.error}</ErrorText>
      }
      <NoAccount>
        {`Don't have an account? `}
        <Link onClick={this.props.onRegisterOpen}>Create one</Link>
      </NoAccount>
    </div>
  );
}
