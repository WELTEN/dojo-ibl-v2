import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import Avatar from 'material-ui/Avatar';
import DefaultProfilePicture from '../../DefaultProfilePicture.png';
import injectFirebaseData from '../../InjectFirebaseData';
import * as firebase from 'firebase';
import { grey600 } from 'material-ui/styles/colors';

const UserInfo = glamorous.div({
  marginBottom: 4,
  display: 'flex',
  alignItems: 'center'
}, ({ isCurrentUser }) => {
  if (isCurrentUser) return { alignSelf: 'flex-end' };
});

const ProfilePicture = glamorous(Avatar)({
  float: 'left',
  marginRight: 4
});

const Name = glamorous.span({
  color: grey600,
  fontSize: 12
});

const isCurrentUser = user => user.key === firebase.auth().currentUser.uid;

const MessageUser = ({ loading, data }) => (
  <WithLoadingSpinner loading={loading}>
    <UserInfo isCurrentUser={isCurrentUser(data)}>
      <ProfilePicture size={14} src={data.photoURL || DefaultProfilePicture} />
      <Name>{data.displayName}</Name>
    </UserInfo>
  </WithLoadingSpinner>
);

MessageUser.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  message: PropTypes.shape({
    user: PropTypes.string.isRequired
  }).isRequired
};

const getRef = props => firebase.database().ref(`users/${props.message.user}`);

export default injectFirebaseData(MessageUser, getRef, true);
