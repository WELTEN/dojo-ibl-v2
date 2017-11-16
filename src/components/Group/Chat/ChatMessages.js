import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import NotFoundTitle from '../../NotFoundTitle';
import ChatMessage from './ChatMessage';

const Container = glamorous.div({
  padding: '6px 12px',
  maxHeight: 400,
  overflowY: 'auto',
  boxSizing: 'border-box'
});

export default class ChatMessages extends Component {
  static propTypes = {
    group: PropTypes.shape({
      messages: PropTypes.object
    }).isRequired
  };

  componentDidMount = () => this.scrollToBottom();
  componentDidUpdate = () => this.scrollToBottom();

  scrollToBottom = () => {
     const chatMessages = document.getElementById('chat-messages');
     if (!chatMessages) return;
     chatMessages.scrollTop = chatMessages.scrollHeight - chatMessages.clientHeight;
  };

  getMessages = () => Object.keys(this.props.group.messages || {});

  render = () => {
    const messages = this.getMessages();
    if (messages.length === 0) {
      return (
        <NotFoundTitle css={{ paddingTop: 24, paddingBottom: 24 }}>
          No chat messages
        </NotFoundTitle>
      );
    }

    return (
      <Container id="chat-messages">
        {messages.map((message) =>
          <ChatMessage
            messageKey={message}
            scrollToBottom={this.scrollToBottom}
            key={message}
          />
        )}
      </Container>
    );
  };
}
