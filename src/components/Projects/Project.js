import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import TitleDateBlock from '../TitleDateBlock';
import ListItem from '../ListItem';
import LoadingSpinner from '../LoadingSpinner';
import ProjectActions from './ProjectActions';

export default class Project extends Component {
  static propTypes = {
    projectKey: PropTypes.string.isRequired
  };

  state = {
    loading: true,
    project: {}
  };

  getRef = () => firebase.database().ref(`projects/${this.props.projectKey}`);

  componentDidMount = () => {
    this.getRef().on('value', (snapshot) => {
      const project = snapshot.val();
      if (project != null) project.key = this.props.projectKey;
      this.setState({
        loading: false,
        project
      });
    });
  };

  componentWillUnmount = () => this.getRef().off();

  render = () => {
    if (this.state.loading) return <LoadingSpinner />
    if (this.state.project == null) return null;
    return (
      <ListItem withBorder>
        <TitleDateBlock
          title={this.state.project.title}
          date={this.state.project.creationDate}
          width="calc(100% - 120px)"
        />
        <ProjectActions project={this.state.project} />
      </ListItem>
    );
  };
}
