import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../LoadingSpinner';
import Item from './Item';
import injectFirebaseData from '../../InjectFirebaseData';
import * as firebase from 'firebase';

const Items = ({ loading, data, checklist }) => {
  if (loading) return <LoadingSpinner />
  return Object.entries(data.items || {}).map(([ key, item ]) =>
    <Item itemKey={key} item={item} checklist={checklist} key={key} />
  );
};

Items.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  checklist: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`checklists/${props.checklist}`);

export default injectFirebaseData(Items, getRef);
