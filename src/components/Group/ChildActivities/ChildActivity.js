import React from 'react';
import PropTypes from 'prop-types';
import ActivityContent from '../ActivityContent';
import LoadingSpinner from '../../LoadingSpinner';
import injectFirebaseData from '../../InjectFirebaseData';
import * as firebase from 'firebase';

const ChildActivity = ({ loading, data }) => {
  if (!data) return null;
  if (loading) return <LoadingSpinner />
  return <ActivityContent activity={data} childActivity />
};

ChildActivity.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  childActivity: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`activities/${props.childActivity}`);

export default injectFirebaseData(ChildActivity, getRef);
