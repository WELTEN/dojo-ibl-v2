import React, { Component } from 'react';
import WithLoadingSpinner from '../WithLoadingSpinner';
import NotFoundTitle from '../NotFoundTitle';
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

  getProjectList = () => Object.keys(this.state.projects || {});

  render = () => (
    <WithLoadingSpinner loading={this.state.loading}>
      {this.getProjectList().length === 0 ? (
        <NotFoundTitle>{`You don't have any projects`}</NotFoundTitle>
      ) : (
        this.getProjectList().map((project) =>
          <Project projectKey={project} key={project} />
        )
      )}
    </WithLoadingSpinner>
  );
}
