import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import PhaseStates from '../PhaseStates';

export default class PhaseActivities extends Component {
  static propTypes = {
    phase: PropTypes.shape({
      activities: PropTypes.object
    }).isRequired,
    group: PropTypes.object.isRequired
  };

  state = {
    loading: true,
    activities: {}
  };

  componentDidMount = () => this.handleProps(this.props);

  componentWillReceiveProps = (props) => {
    if (
      JSON.stringify(props.phase.activities) !==
      JSON.stringify(this.props.phase.activities)
    ) {
      this.handleProps(props);
    }
  };

  handleProps = (props) => {
    if (!props.phase.activities) return;
    this.cleanListeners();
    this.setState({ activities: {} });
    this.handleActivityKeys();
  };

  getActivityKeys = () => Object.keys(this.props.phase.activities || {});

  handleActivityKeys = () => {
    this.getActivityKeys().forEach(this.handleActivityKey);
  };

  handleActivityKey = (key) => {
    firebase.database().ref(`activities/${key}`).on('value', (snapshot) => {
      const activity = snapshot.val();

      if (activity == null) {
        firebase.database().ref(`activities/${key}`).off();
        return;
      }

      const activities = this.state.activities;
      activities[key] = {
        key,
        ...activity
      };
      this.setState({ activities });
    });
  };

  getListenerKeys = () => Object.keys(this.state.activities || {});
  cleanListeners = () => this.getListenerKeys().forEach(this.cleanListener);
  cleanListener = key => firebase.database().ref(`activities/${key}`).off();

  render() {
    const activities = Object.values(this.state.activities);

    return (
      <PhaseStates activities={activities} group={this.props.group} />
    );
  }
}
