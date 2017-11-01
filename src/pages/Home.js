import React from 'react';
import WithLogin from '../components/WithLogin';
import * as firebase from 'firebase';
import WithAppBar from '../components/WithAppBar/index';

const Home = () => (
  <WithLogin>
    <WithAppBar title="Home">
      <h1 onClick={() => firebase.auth().signOut()}>home</h1>
    </WithAppBar>
  </WithLogin>
);

export default Home;
