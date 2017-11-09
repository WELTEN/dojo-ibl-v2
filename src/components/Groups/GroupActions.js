import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import Close from 'material-ui/svg-icons/navigation/close';
import Link from '../Link';
import WithLoadingSpinner from '../WithLoadingSpinner';
import { red500 } from 'material-ui/styles/colors';
import * as firebase from 'firebase';
import injectFirebaseData from '../InjectFirebaseData';

const ActionWrapper = glamorous.div({ display: 'flex' });

class GroupActions extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
    group: PropTypes.shape({
      key: PropTypes.string.isRequired,
      project: PropTypes.string.isRequired
    }).isRequired,
  };

  currentUserOwnsProject = () =>
    this.props.data === firebase.auth().currentUser.uid;

  render = () => (
    <WithLoadingSpinner loading={this.props.loading}>
      <ActionWrapper>
        <Link to={`groups/${this.props.group.key}`}>
          <IconButton>
            <RemoveRedEye />
          </IconButton>
        </Link>
        {!this.currentUserOwnsProject() &&
          <IconButton iconStyle={{ color: red500 }}>
            <Close />
          </IconButton>
        }
      </ActionWrapper>
    </WithLoadingSpinner>
  );
}

const getRef = props => firebase.database().ref(`projects/${props.group.project}/owner`);

export default injectFirebaseData(GroupActions, getRef);
