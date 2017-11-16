import React from 'react';
import PropTypes from 'prop-types';
import { getKeys } from '../../../lib/Firebase';
import Aux from 'react-aux';
import User from './User';

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
        key={owner}
      />
    )}
    {removeOwners(project.users, project.owners).map((user) =>
      <User
        userUid={user}
        key={user}
      />
    )}
  </Aux>
);

UserList.propTypes = {
  project: PropTypes.shape({
    owners: PropTypes.object.isRequired,
    users: PropTypes.object
  }).isRequired
};

export default UserList;
