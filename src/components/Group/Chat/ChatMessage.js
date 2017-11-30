import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import LoadingSpinner from '../../LoadingSpinner';
import * as firebase from 'firebase';
import moment from 'moment';
import {
  grey300,
  grey400,
  white,
  blue500,
  grey600
} from 'material-ui/styles/colors';
import MessageUser from './MessageUser';

const Wrapper = glamorous.div({
  marginBottom: 12,
  display: 'flex',
  flexDirection: 'column'
});

const Message = glamorous.div({
  alignSelf: 'flex-start',
  marginBottom: 4,
  padding: '6px 12px',
  maxWidth: '60%',
  backgroundColor: grey300,
  border: `2px solid ${grey400}`,
  borderRadius: 18,
  display: 'inline-block',
  wordBreak: 'break-all'
}, ({ owned }) => {
  if (owned) return {
    alignSelf: 'flex-end',
    color: white,
    backgroundColor: blue500,
    borderColor: blue500
  };
});

const CreationDate = glamorous.div({
  color: grey600,
  fontSize: 12
}, ({ owned }) => {
  if (owned) return { textAlign: 'right' };
});

export default class ChatMessage extends Component {
  static propTypes = {
    messageKey: PropTypes.string.isRequired,
    scrollToBottom: PropTypes.func.isRequired
  };

  state = {
    loading: true,
    message: {}
  };

  getRef = () => firebase.database().ref(`messages/${this.props.messageKey}`);

  componentDidMount = () => {
    this.getRef().once('value').then((snapshot) => {
      this.setState({
        loading: false,
        message: snapshot.val()
      });
      this.props.scrollToBottom()
    });
  };

  sentByCurrentUser = () =>
    firebase.auth().currentUser.uid === this.state.message.user;

  render = () => {
    const { loading, message } = this.state;
    if (loading) return <LoadingSpinner />
    if (!message) return null;

    const owned = this.sentByCurrentUser();
    return (
      <Wrapper>
        {!owned &&
          <MessageUser message={message} />
        }
        <Message owned={owned}>
          <div>{message.message}</div>
        </Message>
        <CreationDate owned={owned}>
          {moment(message.creationDate).calendar()}
        </CreationDate>
      </Wrapper>
    );
  };
}
