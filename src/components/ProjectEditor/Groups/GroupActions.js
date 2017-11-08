import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Close from 'material-ui/svg-icons/navigation/close';
import { red500 } from 'material-ui/styles/colors';
import NameDescriptionPrompt from '../../NameDescriptionPrompt';
import Confirm from '../../Confirm';

const ActionWrapper = glamorous.div({
  width: 96,
  display: 'flex'
});

export default class GroupActions extends Component {
  static propTypes = {
    group: PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired
  };

  state = {
    editing: false,
    deleting: false
  };

  onEdit = () => this.setState({ editing: true });

  onEditSave = (name, description) => {

    this.setState({ editing: false });
  };

  onEditCancel = () => this.setState({ editing: false });

  onDelete = () => this.setState({ deleting: true });

  onDeleteConfirm = () => {

    this.setState({ deleting: false });
  };

  onDeleteCancel = () => this.setState({ deleting: false });

  render = () => (
    <ActionWrapper>
      <IconButton onClick={this.onEdit}>
        <Edit />
      </IconButton>
      <IconButton iconStyle={{ color: red500 }} onClick={this.onDelete}>
        <Close />
      </IconButton>
      <NameDescriptionPrompt
        title="Edit group"
        msg="Edit the group name/description"
        nameValue={this.props.group.name}
        descriptionValue={this.props.group.description}
        open={this.state.editing}
        onOk={this.onEditSave}
        onCancel={this.onEditCancel}
      />
      <Confirm
        title="Confirm group deletion"
        msg="After you delete a group, there's no way back!"
        open={this.state.deleting}
        onOk={this.onDeleteConfirm}
        onCancel={this.onDeleteCancel}
      />
    </ActionWrapper>
  );
}
