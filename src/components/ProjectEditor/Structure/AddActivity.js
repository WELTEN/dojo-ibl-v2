import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import NameDescriptionPrompt from '../../NameDescriptionPrompt';
import ActivityTypeSelect from './ActivityTypeSelect';
import ActivitySelector from '../ActivitySelector';
import * as firebase from 'firebase';
import {
  createInputInActivity,
  createChecklistInActivity
} from '../../../lib/Firebase';
import { NORMAL, INPUT, CHECKLIST, MULTI } from '../../../lib/activityTypes';

const ButtonContainer = glamorous.footer({ textAlign: 'center' });

export default class AddActivity extends Component {
  static propTypes = {
    phaseKey: PropTypes.string.isRequired
  };

  state = {
    open: false,
    type: NORMAL,
    childActivitiesKey: null
  };

  handleTypeChange = (e, index, value) => {
    if (value === MULTI) {
      const childActivitiesKey = this.createChildActivitiesKey();
      this.setState({ type: value, childActivitiesKey });
    } else {
      if (this.state.childActivitiesKey) this.deleteChildActivities();
      this.setState({ type: value, childActivitiesKey: null });
    }
  };

  createChildActivitiesKey = () =>
    firebase.database().ref(`childActivities`).push().getKey();

  deleteChildActivities = () => {
    firebase.database().ref(`childActivities/${this.state.childActivitiesKey}`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        firebase.database().ref(`activities/${childSnapshot.key}/isChildActivity`).remove();
      });
      this.deleteChildActivitiesKey();
    });
  };

  deleteChildActivitiesKey = () =>
    firebase.database().ref(`childActivities/${this.state.childActivitiesKey}`).remove();

  onOpen = () => this.setState({ open: true });

  onSave = (name, description) => {
    const { type, childActivitiesKey } = this.state;
    const key = firebase.database().ref('activities').push().getKey();
    firebase.database().ref(`phases/${this.props.phaseKey}/activities/${key}`).set(true);
    firebase.database().ref(`activities/${key}`).set({
      name,
      description,
      type,
      childActivitiesKey,
      creationDate: Date.now()
    });

    if (type === INPUT) createInputInActivity(key);
    if (type === CHECKLIST) createChecklistInActivity(key);

    this.onClose();
  };

  onCancel = () => {
    if (this.state.childActivitiesKey) this.deleteChildActivities();
    this.onClose();
  };

  onClose = () => {
    this.setState({
      open: false,
      type: NORMAL,
      childActivitiesKey: null
    });
  };

  render = () => (
    <ButtonContainer>
      <IconButton onClick={this.onOpen}>
        <Add />
      </IconButton>
      <NameDescriptionPrompt
        title="Add an activity"
        msg="Enter a name and/or a description for the new activity."
        open={this.state.open}
        width={this.state.type === MULTI && 1152}
        inputContainerWidth={this.state.type === MULTI && 'calc(100% - 600px)'}
        contentBeforeInputs={() =>
          <div>
            <ActivityTypeSelect
              value={this.state.type}
              onChange={this.handleTypeChange}
              width={this.state.type === MULTI && 'calc(100% - 600px)'}
            />
            {this.state.type === MULTI &&
              <ActivitySelector
                phaseKey={this.props.phaseKey}
                childActivitiesKey={this.state.childActivitiesKey}
              />
            }
          </div>
        }
        onOk={this.onSave}
        onCancel={this.onCancel}
        emptyOnOk
      />
    </ButtonContainer>
  );
}
