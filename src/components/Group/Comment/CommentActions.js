import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import SmallIconButton from '../../SmallIconButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Close from 'material-ui/svg-icons/navigation/close';
import { red500, grey600 } from 'material-ui/styles/colors';
import Prompt from '../../Prompt';
import Confirm from '../../Confirm';
import * as firebase from 'firebase';

const ButtonContainer = glamorous.footer({ marginLeft: 18 });

export default class CommentActions extends Component {
  static propTypes = {
    comment: PropTypes.shape({
      key: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired
    }).isRequired,
    activity: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired,
    group: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    editing: false,
    deleting: false
  };

  onEdit = () => this.setState({ editing: true });

  onEditSave = (comment) => {
    firebase.database().ref(`comments/${this.props.comment.key}`).update({
      comment
    });
    this.setState({ editing: false });
  };

  onEditCancel = () => this.setState({ editing: false });

  onDelete = () => this.setState({ deleting: true });

  onDeleteConfirm = () => {
    const { group, activity, comment } = this.props;
    firebase.database().ref(`groups/${group.key}/activities/${activity.key}/comments/${comment.key}`).remove();
    firebase.database().ref(`comments/${comment.key}`).remove();
  };

  onDeleteCancel = () => this.setState({ deleting: false });

  render = () => (
    <ButtonContainer>
      <SmallIconButton iconStyle={{ color: grey600 }} onClick={this.onEdit}>
        <Edit />
      </SmallIconButton>
      <SmallIconButton iconStyle={{ color: red500 }} onClick={this.onDelete}>
        <Close />
      </SmallIconButton>
      <Prompt
        title="Edit comment"
        msg="Type a comment"
        label="Comment"
        value={this.props.comment.comment}
        open={this.state.editing}
        onOk={this.onEditSave}
        onCancel={this.onEditCancel}
        multiLine
      />
      <Confirm
        title="Confirm comment deletion"
        msg="After you delete a comment, there's no way back!"
        open={this.state.deleting}
        onOk={this.onDeleteConfirm}
        onCancel={this.onDeleteCancel}
      />
    </ButtonContainer>
  );
}
