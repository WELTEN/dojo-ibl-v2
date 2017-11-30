import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from '../../FloatingActionButton';
import ChatIcon from 'material-ui/svg-icons/communication/chat';

const ChatButton = ({ onClick }) => (
  <FloatingActionButton onClick={onClick}>
    <ChatIcon />
  </FloatingActionButton>
);

ChatButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ChatButton;
