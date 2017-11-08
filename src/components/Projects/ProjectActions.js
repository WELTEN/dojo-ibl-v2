import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Close from 'material-ui/svg-icons/navigation/close';
import { red500 } from 'material-ui/styles/colors';
import Confirm from '../Confirm';
import Link from '../Link';
import { deleteProjectAndGroups } from '../../lib/Firebase';
import * as firebase from 'firebase';

const ActionWrapper = glamorous.div({ display: 'flex' });

export default class ProjectActions extends Component {
  static propTypes = {
    project: PropTypes.shape({
      key: PropTypes.string.isRequired,
    }).isRequired
  };

  state = {
    editing: false,
    deleting: false
  };

  onEdit = () => this.setState({ editing: true });

  onEditSave = (name, description) => {
    firebase.database().ref(`groups/${this.props.group.key}`).update({
      name,
      description
    });
    this.setState({ editing: false });
  };

  onEditCancel = () => this.setState({ editing: false });

  onDelete = () => this.setState({ deleting: true });
  onDeleteConfirm = () => deleteProjectAndGroups(this.props.project.key);
  onDeleteCancel = () => this.setState({ deleting: false });

  render = () => (
    <ActionWrapper>
      <Link to={`projects/${this.props.project.key}/edit`}>
        <IconButton>
          <Edit />
        </IconButton>
      </Link>
      <IconButton iconStyle={{ color: red500 }} onClick={this.onDelete}>
        <Close />
      </IconButton>
      <Confirm
        title="Confirm project deletion"
        msg="After you delete a project, there's no way back!"
        open={this.state.deleting}
        onOk={this.onDeleteConfirm}
        onCancel={this.onDeleteCancel}
      />
    </ActionWrapper>
  );
}
