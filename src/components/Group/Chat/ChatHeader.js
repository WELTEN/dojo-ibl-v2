import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import { white } from 'material-ui/styles/colors';
import { primaryColor } from '../../../styles';

const Header = glamorous(Paper)({
  padding: '6px 12px',
  backgroundColor: `${primaryColor} !important`,
  display: 'flex',
  alignItems: 'center'
});

const Title = glamorous.h4({
  margin: 0,
  color: white,
  fontSize: 18,
  flex: 1
});

const CloseButton = glamorous(IconButton)({
  marginTop: '-6px !important',
  marginBottom: '-6px !important',
  marginRight: '-12px !important',
});

const ChatHeader = ({ group, onClose }) => (
  <Header rounded={false}>
    <Title>Chat: {group.name}</Title>
    <CloseButton iconStyle={{ color: white }} onClick={onClose}>
      <Close />
    </CloseButton>
  </Header>
);

ChatHeader.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default ChatHeader;
