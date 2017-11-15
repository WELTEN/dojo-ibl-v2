import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';

export default class Chat extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired
  };

  state = { open: false };

  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  render = () => {
    if (this.state.open) {
      return (
        <ChatWindow
          group={this.props.group}
          open={this.state.open}
          onClose={this.onClose}
        />
      );
    }

    return <ChatButton onClick={this.onOpen} />;
  };
}
