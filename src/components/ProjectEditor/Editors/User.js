import React from 'react';
import PropTypes from 'prop-types';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import injectFirebaseData from '../../InjectFirebaseData';
import * as firebase from 'firebase';

const User = ({ loading, data, isOwner }) => data ? (
  <WithLoadingSpinner loading={loading}>
    <div>
      {JSON.stringify(data)}
      is owner: {(isOwner || false).toString()}
    </div>
  </WithLoadingSpinner>
) : null;

User.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  isOwner: PropTypes.bool,
  userUid: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`users/${props.userUid}`);

export default injectFirebaseData(User, getRef);
