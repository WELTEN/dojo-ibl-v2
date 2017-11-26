import React from 'react';
import PropTypes from 'prop-types';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import { Item, Title, Description } from '../../StyledActivity';
import injectFirebaseData from '../../InjectFirebaseData';
import * as firebase from 'firebase';

const ActivityCardContent = ({ loading, data }) => (
  <WithLoadingSpinner loading={loading}>
    <Item draggable>
      <Title>{data.name}</Title>
      {data.description &&
        <Description>{data.description}</Description>
      }
    </Item>
  </WithLoadingSpinner>
);

ActivityCardContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  activity: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`activities/${props.activity}`);

export default injectFirebaseData(ActivityCardContent, getRef);
