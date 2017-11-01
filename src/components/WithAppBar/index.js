import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import AppBar from 'material-ui/AppBar';
import Aux from 'react-aux';
import LogoutButton from './LogoutButton';
import MenuDrawer from './MenuDrawer';
import * as firebase from 'firebase';

const PageContent = glamorous.main({
  paddingTop: 24,
  paddingBottom: 24,
  paddingLeft: 64,
  paddingRight: 64
});

export default class WithAppBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
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
      <PageContent>
        {this.props.children}
      </PageContent>
    </Aux>
  );
}
