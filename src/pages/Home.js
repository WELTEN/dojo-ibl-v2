import React from 'react';
import WithLogin from '../components/WithLogin';
import WithAppBar from '../components/WithAppBar/index';
import PageTitle from '../components/PageTitle';

const Home = () => (
  <WithLogin>
    <WithAppBar title="Home">
      <PageTitle>Groups</PageTitle>
    </WithAppBar>
  </WithLogin>
);

export default Home;
