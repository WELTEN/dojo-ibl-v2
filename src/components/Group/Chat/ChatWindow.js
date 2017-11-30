import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatForm from './ChatForm';

const StyledWindow = glamorous.div({
  position: 'fixed',
  bottom: 24,
  right: 24,
  width: 400,
  display: 'none',
  boxShadow: '0 20px 50px 0 rgba(0, 0, 0, .3)',
  borderRadius: 2
}, ({ open }) => {
  if (open) return { display: 'block' };
});

const ChatWindow = ({ group, open, onClose }) => (
  <StyledWindow open={open}>
    <ChatHeader group={group} onClose={onClose} />
    <ChatMessages group={group} />
    <ChatForm group={group} />
  </StyledWindow>
);

ChatWindow.propTypes = {
  group: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ChatWindow;
