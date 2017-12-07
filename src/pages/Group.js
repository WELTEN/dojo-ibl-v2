import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import LoadingSpinner from '../components/LoadingSpinner';
import Name from '../components/Group/Name';
import Description from '../components/Group/Description';
import Content from '../components/Group/Content';
import Chat from '../components/Group/Chat';
import AccessVerifier from '../components/Group/AccessVerifier';
import Aux from 'react-aux';
import injectFirebaseData from '../components/InjectFirebaseData';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const toggleOpen = (state = { open: false, openActivity: '' }, action) => {
  switch (action.type) {
    case 'OPEN': return { open: true, openActivity: action.activity };
    case 'CLOSE': return { open: false, openActivity: '' };
    default: return state;
  }
};

const store = createStore(toggleOpen);

const Group = ({ loading, data }) => (
  <Provider store={store}>
    {loading ? (
      <LoadingSpinner />
    ) : (
      <Aux>
        <Name group={data} />
        <Description group={data} />
        <AccessVerifier group={data}>
          <Content group={data} />
          <Chat group={data} />
        </AccessVerifier>
      </Aux>
    )}
  </Provider>
);

Group.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      groupKey: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const getRef = props => firebase.database().ref(`groups/${props.match.params.groupKey}`);

export default injectFirebaseData(Group, getRef, true);
