import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from './Login/index';
import LinearProgress from 'material-ui/LinearProgress';
import * as firebase from 'firebase';

export default class WithLogin extends Component {
  state = {
    loggedIn: false,
    loading: true
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) this.setState({ loggedIn: true, loading: false });
      else this.setState({ loggedIn: false, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <LinearProgress mode="indeterminate" />;
    }

    if (this.state.loggedIn) {
      return this.props.children;
    } else {
      return <Login />;
    }
  }
}

WithLogin.propTypes = {
  children: PropTypes.any.isRequired
};
