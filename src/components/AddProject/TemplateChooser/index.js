import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import StepButtons from '../StepButtons';
import TemplateOverview from './TemplateOverview';
import RaisedButton from 'material-ui/RaisedButton';
import { flattenFirebaseList } from '../../../lib/Firebase';
import injectFirebaseData from '../../InjectFirebaseData';

const NoTemplateButton = glamorous(RaisedButton)({
  marginBottom: '24px !important'
});

class TemplateChooser extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
    onNext: PropTypes.func.isRequired,
    setProjectKey: PropTypes.func.isRequired
  };

  onNextWithoutTemplate = () => {
    const key = this.createProject();
    this.props.setProjectKey(key);
    this.props.onNext();
  };

  onChoose = (templateKey) => {
    const template = this.props.data[templateKey];
    const phases = Object.values(template.phases);
    const projectKey = this.createProject();
    phases.forEach((phase, index) => {
      const phaseKey = this.createPhase(phase, projectKey, index + 1);
      const activities = Object.values(phase.activities || {});
      activities.forEach((activity, index) => {
        this.createActivity(activity, phaseKey, index + 1);
      });
    });
    this.props.setProjectKey(projectKey);
    this.props.onNext();
  };

  createProject = () => {
    const currentUser = firebase.auth().currentUser;
    const key = firebase.database().ref('projects').push().getKey();
    firebase.database().ref(`users/${currentUser.uid}/projects`).child(key).set(true);
    firebase.database().ref(`projects/${key}`).set({
      title: 'No title',
      owners: {
        [currentUser.uid]: true
      },
      creationDate: Date.now()
    });
    return key;
  };

  createPhase = (phase, projectKey, index) => {
    const key = firebase.database().ref('phases').push().getKey();
    firebase.database().ref(`projects/${projectKey}/phases`).child(key).set(index);
    firebase.database().ref(`phases/${key}`).set({
      name: phase.name
    });
    return key;
  };

  createActivity = (activity, phaseKey, index) => {
    const key = firebase.database().ref('activities').push().getKey();
    firebase.database().ref(`phases/${phaseKey}/activities`).child(key).set(index);
    firebase.database().ref(`activities/${key}`).set({
      ...activity,
      creationDate: Date.now()
    });
    return key;
  };

  render = () => (
    <WithLoadingSpinner loading={this.props.loading}>
      <NoTemplateButton
        label="Continue without template"
        onClick={this.onNextWithoutTemplate}
        primary
      />
      <TemplateOverview
        templates={flattenFirebaseList(this.props.data)}
        onChoose={this.onChoose}
      />
      <StepButtons onNext={this.onNextWithoutTemplate} />
    </WithLoadingSpinner>
  );
}

export default injectFirebaseData(TemplateChooser, () => firebase.database().ref('templates'));
