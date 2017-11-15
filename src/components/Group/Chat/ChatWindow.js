import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Paper from 'material-ui/Paper';
import ChatHeader from './ChatHeader';

const CustomPaper = ({ open, children, ...props }) => (
  <Paper {...props}>{children}</Paper>
);

const StyledWindow = glamorous(CustomPaper)({
  position: 'fixed',
  bottom: 24,
  right: 24,
  width: 400,
  display: 'none'
}, ({ open }) => {
  if (open) return { display: 'block' };
});

const ChatWindow = ({ group, open, onClose }) => (
  <StyledWindow open={open} zDepth={2}>
    <ChatHeader group={group} onClose={onClose} />
    *chat messages*
    *chat form*
  </StyledWindow>
);

ChatWindow.propTypes = {
  group: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ChatWindow;
