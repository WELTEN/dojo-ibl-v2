import React, { Component } from 'react';
import glamorous from 'glamorous';
import Paper from 'material-ui/Paper';
import { white } from 'material-ui/styles/colors';
import EmailPasswordLogin from './EmailPasswordLogin';
import GoogleLogin from './GoogleLogin';
import Register from './Register';

const Container = glamorous(Paper)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: white,
  display: 'inline-flex',
  overflow: 'hidden'
}, ({ open }) => {
  if (open) return { width: 800 };
});

const LoginSection = glamorous.section({
  padding: 48,
  width: 400,
  boxSizing: 'border-box'
});

export const Title = glamorous.h1({
  margin: 0,
  fontSize: 32,
  fontWeight: 300
});

export default class Login extends Component {
  state = {
    registerOpen: false
  };

  onRegisterOpen = () => this.setState({ registerOpen: true });
  onRegisterClose = () => this.setState({ registerOpen: false });

  render = () => (
    <Container open={this.state.registerOpen}>
      <LoginSection>
        <Title>Login</Title>
        <EmailPasswordLogin onRegisterOpen={this.onRegisterOpen} />
        <GoogleLogin />
      </LoginSection>
      <Register
        open={this.state.registerOpen}
        onClose={this.onRegisterClose}
      />
    </Container>
  );
}
