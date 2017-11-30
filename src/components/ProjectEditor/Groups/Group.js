import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import LoadingSpinner from '../../LoadingSpinner';
import GroupActions from './GroupActions';
import * as firebase from 'firebase';
import ListItem from '../../ListItem';
import GroupListItem from '../../GroupListItem';
import injectFirebaseData from '../../InjectFirebaseData';

const Item = glamorous(ListItem)({
  ':first-child': {
    marginTop: 24
  }
});

const Group = ({ loading, data }) => {
  if (loading) return <LoadingSpinner />;
  return (
    <Item>
      <GroupListItem
        group={data}
        actions={group => <GroupActions group={group} />}
      />
    </Item>
  );
};

Group.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  groupKey: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`groups/${props.groupKey}`);

export default injectFirebaseData(Group, getRef, true);
