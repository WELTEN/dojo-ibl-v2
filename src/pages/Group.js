import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import LoadingSpinner from '../components/LoadingSpinner';
import GroupName from '../components/Group/GroupName';
import GroupDescription from '../components/Group/GroupDescription';
import GroupContent from '../components/Group/GroupContent';
import injectFirebaseData from '../components/InjectFirebaseData';
import Aux from 'react-aux';
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
        <GroupName group={data} />
        <GroupDescription group={data} />
        <GroupContent group={data} />
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
