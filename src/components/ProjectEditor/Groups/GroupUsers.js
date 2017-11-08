import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import DefaultProfilePicture from '../../DefaultProfilePicture.png';

const PhotoContainer = glamorous.section({
  marginRight: 24,
  display: 'flex',
  alignItems: 'center'
});

const UserPhoto = glamorous.img({
  marginLeft: 12,
  width: 36,
  height: 36,
  borderRadius: '100%',
  ':first-child': {
    marginLeft: 0
  }
});

const HiddenUsers = glamorous.h4({
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 12
});

const limitUsers = users => Object.entries(users || {}).slice(0, 5);
const getUserCount = users => Object.entries(users || {}).length;

const GroupUsers = ({ group }) => (
  <PhotoContainer>
    {limitUsers(group.users).map(([ user, photo ]) =>
      <UserPhoto
        src={photo || DefaultProfilePicture}
        alt="Profile picture"
        key={user}
      />
    )}
    {getUserCount(group.users) > 6 &&
      <HiddenUsers>
        {getUserCount(group.users) - 6} users hidden
      </HiddenUsers>
    }
  </PhotoContainer>
);

GroupUsers.propTypes = {
  group: PropTypes.shape({
    users: PropTypes.object
  }).isRequired
};

export default GroupUsers;
