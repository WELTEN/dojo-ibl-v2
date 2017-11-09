import React from 'react';
import PageTitle from '../components/PageTitle';
import GroupList from '../components/Groups/GroupList';
import Aux from 'react-aux';

const Groups = () => (
  <Aux>
    <PageTitle>Groups</PageTitle>
    <div>*join inquiry form*</div>
    <GroupList />
  </Aux>
);

export default Groups;
