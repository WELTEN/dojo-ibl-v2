import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import WithLoadingSpinner from '../WithLoadingSpinner';
import StepButtons from './StepButtons';
import TextField from 'material-ui/TextField';
import { deleteProject } from '../../lib/Firebase';

const Text = glamorous.p({ margin: 0 });

export default class SetTitle extends Component {
  static propTypes = {
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    projectKey: PropTypes.string.isRequired
  };

  state = {
    loading: true,
    project: null,
    value: '',
    hasTyped: false
  };

  componentDidMount = () => {
    firebase.database().ref(`projects/${this.props.projectKey}`).once('value', (snapshot) => {
      const project = snapshot.val();

      if (!project) this.props.onPrev();

      this.setState({
        loading: false,
        project,
        value: project.title
      });
    });
  };

  onPrev = () => {
    const { onPrev, projectKey } = this.props;
    deleteProject(projectKey);
    onPrev();
  };

  handleTitleChange = e => this.setState({ value: e.target.value });

  onNext = () => {
    const { onNext, projectKey } = this.props;
    firebase.database().ref(`projects/${projectKey}/title`).set(this.state.value);
    onNext();
  };

  render = () => (
    <WithLoadingSpinner loading={this.state.loading}>
      <Text>{`Enter a title for the project you've just created.`}</Text>
      <TextField
        floatingLabelText="Project title"
        value={this.state.value}
        onChange={this.handleTitleChange}
      />
      <StepButtons
        onPrev={this.onPrev}
        onNext={this.onNext}
      />
    </WithLoadingSpinner>
  );
}
