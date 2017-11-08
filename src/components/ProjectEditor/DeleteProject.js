import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import glamorous from 'glamorous';
import FlatButton from 'material-ui/FlatButton';
import { red500 } from 'material-ui/styles/colors';
import Confirm from '../Confirm';
import { deleteProjectAndGroups } from '../../lib/Firebase';

const ButtonContainer = glamorous.footer({ textAlign: 'center' });

const DeleteButton = glamorous(FlatButton)({ marginTop: '24px !important' });

class DeleteProject extends Component {
  static propTypes = {
    projectKey: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  state = { deleting: false };

  onDelete = () => this.setState({ deleting: true });
  onDeleteConfirm = () => {
    deleteProjectAndGroups(this.props.projectKey);
    this.props.history.push('/projects');
  }
  onDeleteCancel = () => this.setState({ deleting: false });

  render = () => (
    <ButtonContainer>
      <DeleteButton
        label="Delete project"
        style={{ color: red500 }}
        onClick={this.onDelete}
      />
      <Confirm
        title="Confirm project deletion"
        msg="After you delete a project, there's no way back!"
        open={this.state.deleting}
        onOk={this.onDeleteConfirm}
        onCancel={this.onDeleteCancel}
      />
    </ButtonContainer >
  );
}

export default withRouter(DeleteProject);
