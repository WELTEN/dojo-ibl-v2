import React from 'react';
import glamorous from 'glamorous';
import Paper from 'material-ui/Paper';
import { white } from 'material-ui/styles/colors';
import EmailPasswordLogin from './EmailPasswordLogin';
import GoogleLogin from './GoogleLogin';

const LoginSection = glamorous(Paper)({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: 48,
  width: 400,
  height: '100vh',
  backgroundColor: white,
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
});

const Title = glamorous.h1({
  fontSize: 36
});

const Login = () => (
  <LoginSection>
    <section>
      <Title>Login</Title>
      <EmailPasswordLogin />
      <GoogleLogin />
    </section>
  </LoginSection>
);

export default Login;
