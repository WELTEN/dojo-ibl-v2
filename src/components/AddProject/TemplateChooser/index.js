import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import StepButtons from '../StepButtons';
import TemplateOverview from './TemplateOverview';
import RaisedButton from 'material-ui/RaisedButton';
import { flattenFirebaseList } from '../../../lib/Firebase';

const NoTemplateButton = glamorous(RaisedButton)({
  marginBottom: '24px !important'
});

export default class TemplateChooser extends Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
    setProjectKey: PropTypes.func.isRequired
  };

  state = {
    loading: true,
    templates: {}
  };

  componentDidMount = () => {
    firebase.database().ref('templates').once('value', (snapshot) => {
      this.setState({
        loading: false,
        templates: snapshot.val()
      });
    });
  };

  onNextWithoutTemplate = () => {
    const key = this.createProject();
    this.props.setProjectKey(key);
    this.props.onNext();
  };

  onChoose = (templateKey) => {
    const template = this.state.templates[templateKey];
    const phases = Object.values(template.phases);
    const projectKey = this.createProject();
    phases.forEach((phase) => {
      const phaseKey = this.createPhase(phase, projectKey);
      const activities = Object.values(phase.activities || {});
      activities.forEach((activity) => {
        this.createActivity(activity, phaseKey);
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
      creationDate: Date.now(),
      owner: currentUser.uid
    });
    return key;
  };

  createPhase = (phase, projectKey) => {
    const key = firebase.database().ref('phases').push().getKey();
    firebase.database().ref(`projects/${projectKey}/phases`).child(key).set(true);
    firebase.database().ref(`phases/${key}`).set({
      name: phase.name
    });
    return key;
  };

  createActivity = (activity, phaseKey) => {
    const key = firebase.database().ref('activities').push().getKey();
    firebase.database().ref(`phases/${phaseKey}/activities`).child(key).set(true);
    firebase.database().ref(`activities/${key}`).set(activity);
    return key;
  };

  render = () => (
    <WithLoadingSpinner loading={this.state.loading}>
      <NoTemplateButton
        label="Continue without template"
        onClick={this.onNextWithoutTemplate}
        primary
      />
      <TemplateOverview
        templates={flattenFirebaseList(this.state.templates)}
        onChoose={this.onChoose}
      />
      <StepButtons onNext={this.onNextWithoutTemplate} />
    </WithLoadingSpinner>
  );
}
