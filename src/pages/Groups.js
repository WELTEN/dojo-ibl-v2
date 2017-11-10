import React from 'react';
import PageTitle from '../components/PageTitle';
import JoinGroup from '../components/Groups/JoinGroup';
import GroupList from '../components/Groups/GroupList';
import Aux from 'react-aux';

const Groups = () => (
  <Aux>
    <PageTitle>Groups</PageTitle>
    <JoinGroup />
    <GroupList />
  </Aux>
);

export default Groups;
