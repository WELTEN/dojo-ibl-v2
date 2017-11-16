import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Send from 'material-ui/svg-icons/content/send';
import { grey300, grey400 } from 'material-ui/styles/colors';
import * as firebase from 'firebase';

const Form = glamorous.footer({
  padding: '6px 12px',
  backgroundColor: grey300,
  display: 'flex',
  alignItems: 'center'
}, ({ hasError }) => {
  if (hasError) return { paddingBottom: 18 };
});

const SendButton = glamorous(IconButton)({
  marginRight: '-12px !important'
});

export default class ChatForm extends Component {
  static propTypes = {
    group: PropTypes.shape({
       key: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    value: '',
    error: ''
  };

  componentDidMount = () => {
    window.onkeyup = (e) => {
      const key = e.keyCode ? e.keyCode : e.which;
      if (key === 13) this.onSend();
    };
  };

  componentWillUnmount = () => window.onkeyup = undefined;

  handleChange = e => this.setState({ value: e.target.value });

  onSend = async () => {
    const message = this.state.value;
    if (!message.trim()) {
      this.setState({ error: 'Chat message can\'t be empty.'});
      return;
    }

    const currentUser = firebase.auth().currentUser;
    const key = firebase.database().ref('messages').push().getKey();
    firebase.database().ref(`messages/${key}`).set({
      message,
      user: currentUser.uid,
      creationDate: Date.now()
    });
    firebase.database().ref(`groups/${this.props.group.key}/messages/${key}`).set(true);
    this.setState({ value: '', error: '' });
  };

  render = () => (
    <Form hasError={!!this.state.error}>
      <TextField
        hintText="Type a chat message"
        value={this.state.value}
        errorText={this.state.error}
        onChange={this.handleChange}
        underlineStyle={{ borderColor: grey400 }}
        fullWidth
      />
      <SendButton
        disabled={this.state.value.length === 0}
        onClick={this.onSend}
      >
        <Send />
      </SendButton>
    </Form>
  );
}
