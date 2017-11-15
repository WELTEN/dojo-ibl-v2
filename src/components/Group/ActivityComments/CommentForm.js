import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import DefaultProfilePicture from '../../DefaultProfilePicture.png';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import { grey400 } from 'material-ui/styles/colors';
import * as firebase from 'firebase';

const Form = glamorous.section({
  whiteSpace: 'initial',
  display: 'flex'
});

const ProfilePicture = glamorous(Avatar)({ marginRight: 12 });

const Content = glamorous.div({ flex: 1 });

const CommentField = glamorous(TextField)({
  marginTop: '-12px !important'
}, ({ value }) => {
  if (!value) return { height: '48px !important' };
});

const ButtonContainer = glamorous.footer({ float: 'right' });

const CancelButton = glamorous(FlatButton)({
  marginRight: '12px !important'
});

export default class CommentForm extends Component {
  static propTypes = {
    activity: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired,
    group: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    value: '',
    error: ''
  };

  handleChange = e => this.setState({ value: e.target.value });

  onComment = () => {
    const comment = this.state.value;
    if (!comment) {
      this.setState({ error: 'Comment can\'t be empty.' });
      return;
    }

    this.onCancel();
    const currentUser = firebase.auth().currentUser;
    const key = firebase.database().ref('comments').push().getKey();
    firebase.database().ref(`comments/${key}`).set({
      comment,
      user: currentUser.uid,
      creationDate: Date.now()
    });
    firebase.database().ref(`groups/${this.props.group.key}/activities/${this.props.activity.key}/comments/${key}`).set(true);
  };

  onCancel = () => this.setState({ value: '', error: '' });

  render = () => {
    const photoURL = firebase.auth().currentUser.photoURL;
    return (
      <Form>
        <ProfilePicture size={48} src={photoURL || DefaultProfilePicture} />
        <Content>
          <CommentField
            className={this.state.value ? '' : 'fix-textarea'}
            hintText="Type a comment"
            value={this.state.value}
            errorText={this.state.error}
            onChange={this.handleChange}
            underlineStyle={{ borderColor: grey400 }}
            fullWidth
            multiLine
          />
          <ButtonContainer>
            <CancelButton
              label="Cancel"
              onClick={this.onCancel}
              disabled={this.state.value.length === 0}
            />
            <RaisedButton
              label="Comment"
              onClick={this.onComment}
              disabled={this.state.value.length === 0}
              primary
            />
          </ButtonContainer>
        </Content>
      </Form>
    );
  };
}
