import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WithLoadingSpinner from '../WithLoadingSpinner';
import NotFoundTitle from '../NotFoundTitle';
import * as firebase from 'firebase';
import EditorTabs from './EditorTabs';
import DeleteProject from './DeleteProject';
import Aux from 'react-aux';

export default class ProjectEditor extends Component {
  static propTypes = {
    projectKey: PropTypes.string.isRequired,
    withDelete: PropTypes.bool
  };

  state = {
    loading: true,
    project: null
  };

  getProjectRef = () =>
    firebase.database().ref(`projects/${this.props.projectKey}`);

  componentDidMount = () => {
    this.getProjectRef().on('value', (snapshot) => {
      const project = snapshot.val();
      project.key = this.props.projectKey;

      this.setState({
        loading: false,
        project
      });
    });
  };

  componentWillUnmount = () => this.getProjectRef().off();

  render = () => (
    <WithLoadingSpinner loading={this.state.loading}>
      {this.state.project ? (
        <Aux>
          <EditorTabs project={this.state.project} />
          {this.props.withDelete &&
            <DeleteProject projectKey={this.props.projectKey} />
          }
        </Aux>
      ) : (
        <NotFoundTitle>{`Project doesn't exist`}</NotFoundTitle>
      )}
    </WithLoadingSpinner>
  );
}
