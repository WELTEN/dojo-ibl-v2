import React, { Component } from 'react';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { red500, grey500 } from 'material-ui/styles/colors';
import Link from '../Link';

const BottomText = glamorous.div({
  marginTop: 4,
  fontSize: 12
});

const ErrorText = glamorous(BottomText)({
  color: red500
});

const NoAccount = glamorous(BottomText)({
  color: grey500
});

export default class EmailPasswordLogin extends Component {
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
        label="Login"
        onClick={this.onLogin}
        secondary
        fullWidth
      />
      {this.state.error &&
        <ErrorText>{this.state.error}</ErrorText>
      }
      <NoAccount>
        {`Don't have an account? `}
        <Link to="/create-account">Create one</Link>
      </NoAccount>
    </div>
  );
}
