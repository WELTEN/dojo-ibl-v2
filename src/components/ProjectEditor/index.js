import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WithLoadingSpinner from '../WithLoadingSpinner';
import * as firebase from 'firebase';
import EditorTabs from './EditorTabs';

export default class ProjectEditor extends Component {
  static propTypes = {
    projectKey: PropTypes.string.isRequired
  };

  state = {
    loading: true,
    project: null
  };

  getProjectRef = () =>
    firebase.database().ref(`projects/${this.props.projectKey}`);

  componentDidMount = () => {
    this.getProjectRef().on('value', (snapshot) => {
      this.setState({
        loading: false,
        project: snapshot.val()
      });
    });
  };

  componentWillUnmount = () => this.getProjectRef().off();

  render = () => (
    <WithLoadingSpinner loading={this.state.loading}>
      {this.state.project ? (
        <EditorTabs project={this.state.project} />
      ) : (
        <h1>Nope</h1>
      )}
    </WithLoadingSpinner>
  );
}
