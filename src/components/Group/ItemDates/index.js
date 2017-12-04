import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../LoadingSpinner';
import { TODO, PROGRESS, DONE } from '../PhaseStates/StateTypes';
import DateField from './DateField';
import * as firebase from 'firebase';
import injectFirebaseData from '../../InjectFirebaseData';

const isEarlier = (dateOne, dateTwo) => {
  if (dateOne.getYear() > dateTwo.getYear()) return false;
  if (dateOne.getYear() < dateTwo.getYear()) return true;
  if (dateOne.getMonth() > dateTwo.getMonth()) return false;
  if (dateOne.getMonth() < dateTwo.getMonth()) return true;
  if (dateOne.getDate() >= dateTwo.getDate()) return false;
  return true;
};

const isLater = (dateOne, dateTwo) => {
  if (dateOne.getYear() < dateTwo.getYear()) return false;
  if (dateOne.getYear() > dateTwo.getYear()) return true;
  if (dateOne.getMonth() < dateTwo.getMonth()) return false;
  if (dateOne.getMonth() > dateTwo.getMonth()) return true;
  if (dateOne.getDate() <= dateTwo.getDate()) return false;
  return true;
};

const ItemDates = ({ loading, data, activityKey, group, creationDate }) => {
  const activity = data || {};
  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <DateField
        fieldName="startDate"
        fieldTitle="Start date"
        activityKey={activityKey}
        activity={activity}
        group={group}
        shouldDisableDate={(date) => {
          if (activity.endDate) {
            return isLater(date, new Date(activity.endDate));
          }
          return false;
        }}
        afterChange={(date) => {
          firebase.database().ref(`groups/${group}/states/${activityKey}`).once('value').then((snapshot) => {
            const state = snapshot.val();
            if (state === TODO || !state) {
              firebase.database().ref(`groups/${group}/activities/${activityKey}`).child('startDate').set(date);
              firebase.database().ref(`groups/${group}/states/${activityKey}`).set(PROGRESS);
            }
          });
        }}
      />
      <DateField
        fieldName="endDate"
        fieldTitle="End date"
        activityKey={activityKey}
        activity={activity}
        group={group}
        shouldDisableDate={(date) => {
          if (activity.startDate) {
            return isEarlier(date, new Date(activity.startDate));
          }
          return false;
        }}
        afterChange={(date) => {
          firebase.database().ref(`groups/${group}/states/${activityKey}`).once('value').then((snapshot) => {
            const state = snapshot.val();
            if (state !== DONE) {
              if (!activity.startDate) {
                firebase.database().ref(`groups/${group}/activities/${activityKey}`).child('startDate').set(date);
              }
              firebase.database().ref(`groups/${group}/states/${activityKey}`).set(DONE);
            }
          });
        }}
      />
      <DateField
        fieldName="plannedStartDate"
        fieldTitle="Planned start date"
        activityKey={activityKey}
        activity={activity}
        group={group}
        shouldDisableDate={(date) => {
          if (activity.plannedEndDate) {
            return isLater(date, new Date(activity.plannedEndDate));
          }
          return false;
        }}
      />
      <DateField
        fieldName="plannedEndDate"
        fieldTitle="Planned end date"
        activityKey={activityKey}
        activity={activity}
        group={group}
        shouldDisableDate={(date) => {
          if (activity.plannedStartDate) {
            return isEarlier(date, new Date(activity.plannedStartDate));
          }
          return false;
        }}
      />
    </div>
  );
};

ItemDates.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  activityKey: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`groups/${props.group}/activities/${props.activityKey}`);

export default injectFirebaseData(ItemDates, getRef);
