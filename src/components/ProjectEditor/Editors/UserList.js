import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { getKeys } from '../../../lib/Firebase';
import Aux from 'react-aux';
import User from './User';
import { grey300 } from 'material-ui/styles/colors';

const Separator = glamorous.div({
  marginBottom: 12,
  width: '100%',
  height: 2,
  backgroundColor: grey300
});

const removeOwners = (users, owners) => {
  const ownerKeys = getKeys(owners);
  return getKeys(users).filter(user => ownerKeys.indexOf(user) === -1);
};

const UserList = ({ project }) => (
  <Aux>
    {getKeys(project.owners).map((owner) =>
      <User
        userUid={owner}
        isOwner
        projectKey={project.key}
        key={owner}
      />
    )}
    <Separator />
    {removeOwners(project.users, project.owners).map((user) =>
      <User
        userUid={user}
        projectKey={project.key}
        key={user}
      />
    )}
  </Aux>
);

UserList.propTypes = {
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
    owners: PropTypes.object.isRequired,
    users: PropTypes.object
  }).isRequired
};

export default UserList;
