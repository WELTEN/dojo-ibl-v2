import React from 'react';
import PropTypes from 'prop-types';
import ChildActivity from './ChildActivity';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import injectFirebaseData from '../../InjectFirebaseData';
import * as firebase from 'firebase';

const sortChildActivityKeys = (childActivities) => {
  const activities = childActivities || {};
  return Object.keys(activities).sort((a, b) => activities[a] - activities[b]);
};

const ChildActivities = ({ loading, data }) => (
  <WithLoadingSpinner loading={loading}>
    {sortChildActivityKeys(data).map((key) =>
      <ChildActivity childActivity={key} key={key} />
    )}
  </WithLoadingSpinner>
);

ChildActivities.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  childActivitiesKey: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`childActivities/${props.childActivitiesKey}`);

export default injectFirebaseData(ChildActivities, getRef);
