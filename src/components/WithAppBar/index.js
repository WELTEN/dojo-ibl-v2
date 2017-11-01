import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Aux from 'react-aux';
import LogoutButton from './LogoutButton';
import MenuDrawer from './MenuDrawer';
import * as firebase from 'firebase';

export default class WithAppBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    showGroupInfo: PropTypes.bool
  };

  state = { drawerOpen: false };

  onOpenDrawer = () => this.setState({ drawerOpen: true });
  onChangeDrawer = open => this.setState({ drawerOpen: open });

  isLoggedIn = () => firebase.auth().currentUser != null;

  render = () => (
    <Aux>
      <AppBar
        title={this.props.title}
        onLeftIconButtonTouchTap={this.onOpenDrawer}
        iconElementRight={this.isLoggedIn() ? <LogoutButton /> : null}
      />
      <MenuDrawer
        open={this.state.drawerOpen}
        onChange={this.onChangeDrawer}
      />
    </Aux>
  );
}
