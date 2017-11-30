import React from 'react';
import PropTypes from 'prop-types';
import WithLoadingSpinner from '../WithLoadingSpinner';
import NotFoundTitle from '../NotFoundTitle';
import * as firebase from 'firebase';
import Group from './Group';
import injectFirebaseData from '../InjectFirebaseData';

const getGroupList = groups => Object.keys(groups || {});

const GroupList = ({ loading, data }) => (
  <WithLoadingSpinner loading={loading}>
    {getGroupList(data).length === 0 ? (
      <NotFoundTitle>
        {`You aren't participating in any groups`}
      </NotFoundTitle>
    ) : (
      getGroupList(data).reverse().map((group) =>
        <Group groupKey={group} key={group} />
      )
    )}
  </WithLoadingSpinner>
);

GroupList.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any
};

const getRef = (props, currentUser) =>
  firebase.database().ref(`users/${currentUser.uid}/groups`);

export default injectFirebaseData(GroupList, getRef);
