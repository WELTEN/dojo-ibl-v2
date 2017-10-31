import React from 'react';
import WithLogin from '../components/WithLogin';
import * as firebase from 'firebase';

const Home = () => (
  <WithLogin>
    <h1 onClick={() => firebase.auth().signOut()}>home</h1>
  </WithLogin>
);

export default Home;
