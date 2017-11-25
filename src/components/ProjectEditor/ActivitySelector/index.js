import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { grey100 } from 'material-ui/styles/colors';
import LoadingSpinner from '../../LoadingSpinner';
import ActivitySelectField from './ActivitySelectField';
import * as firebase from 'firebase';
import injectFirebaseData from '../../InjectFirebaseData';

const Container = glamorous.section({
  float: 'right',
  marginLeft: 24,
  padding: 24,
  width: 576,
  minHeight: 306,
  backgroundColor: grey100,
  borderRadius: 2,
  boxSizing: 'border-box'
});

const Title = glamorous.h4({
  marginTop: 0,
  marginBottom: 12,
  fontSize: 18
});

const ActivitySelector = ({
  loading,
  data,
  phaseKey,
  activityKey,
  childActivitiesKey
}) => (
  <Container>
    <Title>Select child activities</Title>
    {loading ? (
      <LoadingSpinner />
    ) : (
      <ActivitySelectField
        phaseKey={phaseKey}
        activityKey={activityKey}
        childActivities={data}
        childActivitiesKey={childActivitiesKey}
      />
    )}
  </Container>
);

ActivitySelector.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  phaseKey: PropTypes.string.isRequired,
  activityKey: PropTypes.string,
  childActivitiesKey: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`childActivities/${props.childActivitiesKey}`);

export default injectFirebaseData(ActivitySelector, getRef);
