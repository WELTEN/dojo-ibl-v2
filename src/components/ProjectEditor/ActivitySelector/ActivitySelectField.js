import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import SelectField from 'material-ui/SelectField';
import ActivityMenuItem from './ActivityMenuItem';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import * as firebase from 'firebase';
import injectFirebaseData from '../../InjectFirebaseData';
import { primaryColor } from '../../../styles';

const StyledSelectField = glamorous(SelectField)({
  marginTop: '-14px !important'
});

const NoActivities = glamorous.h4({ margin: 0 });

class ActivitySelectField extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
    phaseKey: PropTypes.string.isRequired,
    activityKey: PropTypes.string,
    childActivities: PropTypes.object,
    childActivitiesKey: PropTypes.string.isRequired
  };

  handleChange = (e, index, values) => {
    const oldActivities = Object.keys(this.props.childActivities || {});
    this.addNewActivities(oldActivities, values);
    this.deleteRemovedActivities(oldActivities, values);
  };

  addNewActivities = (oldActivities, selectedActivities) => {
    const newActivities = this.getNewActivities(
      oldActivities,
      selectedActivities
    );
    let lastItemIndex = oldActivities.length;
    const updates = {};
    newActivities.forEach((item) => {
      updates[item] = lastItemIndex;
      lastItemIndex++
    });
    firebase.database().ref(`childActivities/${this.props.childActivitiesKey}`).update(updates);
  };

  getNewActivities = (oldActivities, selectedActivities) =>
    selectedActivities.filter(item => oldActivities.indexOf(item) === -1);

  deleteRemovedActivities = (oldActivities, selectedActivities) => {
    const removedActivities = this.getRemovedActivities(oldActivities, selectedActivities);
    removedActivities.forEach((item) => {
      firebase.database().ref(`childActivities/${this.props.childActivitiesKey}/${item}`).remove();
    });
  };

  getRemovedActivities = (oldActivities, selectedActivities) =>
    oldActivities.filter(item => selectedActivities.indexOf(item) === -1);

  getItemArr = () =>
    Object.keys(this.props.data || {}).filter(
      item => item !== this.props.activityKey
    );

  getSelectItems = () => this.getItemArr().map((item, index) =>
    <ActivityMenuItem
      activityKey={item}
      value={item}
      checked={typeof (this.props.childActivities || {})[item] !== 'undefined'}
      key={index}
    />
  );

  getSelectedActivitiesCount = (activities) => {
    switch (activities.length) {
      case 0: return ''
      case 1: return '1 activity selected'
      default: return `${activities.length} activities selected`
    }
  };

  phaseHasActivities = () => !!this.getItemArr().length;

  render = () => (
    <WithLoadingSpinner loading={this.props.loading}>
      {this.phaseHasActivities() ? (
        <StyledSelectField
          floatingLabelText="Select activities"
          value={Object.keys(this.props.childActivities || {})}
          onChange={this.handleChange}
          selectedMenuItemStyle={{ color: primaryColor }}
          selectionRenderer={this.getSelectedActivitiesCount}
          multiple
          fullWidth
        >
          {this.getSelectItems()}
        </StyledSelectField>
      ) : (
        <NoActivities>
          {`This phase doesn't have any activities.`}
        </NoActivities>
      )}
    </WithLoadingSpinner>
  );
}

const getRef = props => firebase.database().ref(`phases/${props.phaseKey}/activities`);

export default injectFirebaseData(ActivitySelectField, getRef);
