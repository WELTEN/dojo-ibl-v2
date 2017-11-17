import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Avatar from 'material-ui/Avatar';
import DefaultProfilePicture from '../../DefaultProfilePicture.png';
import LoadingSpinner from '../../LoadingSpinner';
import ListItem, { ContentBlock } from '../../ListItem';
import DowngradeToUserButton from './DowngradeToUserButton';
import UpgradeToEditorButton from './UpgradeToEditorButton';
import injectFirebaseData from '../../InjectFirebaseData';
import * as firebase from 'firebase';

const UserListItem = glamorous(ListItem)({
  marginBottom: 12,
  ':first-child': {
    marginTop: 24
  }
});

const UserPhoto = glamorous(Avatar)({ marginRight: 12 });

const User = ({ loading, data, isOwner, projectKey }) => {
  if (!data) return null;
  if (loading) return <LoadingSpinner />
  return (
    <UserListItem>
      <ContentBlock>
        <UserPhoto size={36} src={data.photoURL || DefaultProfilePicture} />
        {data.displayName}
      </ContentBlock>
      {isOwner ? (
        <DowngradeToUserButton user={data} projectKey={projectKey} />
      ) : (
        <UpgradeToEditorButton user={data} projectKey={projectKey} />
      )}
    </UserListItem>
  );
};

User.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  isOwner: PropTypes.bool,
  projectKey: PropTypes.string.isRequired,
  userUid: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`users/${props.userUid}`);

export default injectFirebaseData(User, getRef, true);
