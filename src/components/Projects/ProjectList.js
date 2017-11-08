import React, { Component } from 'react';
import WithLoadingSpinner from '../WithLoadingSpinner';
import * as firebase from 'firebase';
import Project from './Project';

export default class ProjectList extends Component {
  state = {
    loading: true,
    projects: {}
  };

  currentUser = firebase.auth().currentUser;

  getRef = () => firebase.database().ref(`users/${this.currentUser.uid}/projects`);

  componentDidMount = () => {
    this.getRef().on('value', (snapshot) => {
      this.setState({
        loading: false,
        projects: snapshot.val()
      });
    });
  };

  componentWillUnmount = () => this.getRef().off();

  render = () => (
    <WithLoadingSpinner loading={this.state.loading}>
      {Object.keys(this.state.projects || {}).map((project) =>
        <Project projectKey={project} key={project} />
      )}
    </WithLoadingSpinner>
  );
}
