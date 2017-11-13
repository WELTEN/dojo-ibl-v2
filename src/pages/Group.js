import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import PageTitle from '../components/PageTitle';
import WithLoadingSpinner from '../components/WithLoadingSpinner';
import injectFirebaseData from '../components/InjectFirebaseData';

const Group = ({ loading, data }) => (
  <WithLoadingSpinner loading={loading}>
    <PageTitle>{data.name}</PageTitle>
    <p>
      {JSON.stringify(data)}
    </p>
  </WithLoadingSpinner>
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

export default injectFirebaseData(Group, getRef);
