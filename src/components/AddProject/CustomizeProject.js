import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from 'react-aux';
import StepButtons from './StepButtons';
import * as firebase from 'firebase';

export default class CustomizeProject extends Component {
  static propTypes = {
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    projectKey: PropTypes.string.isRequired
  };

  onPrev = () => {
    const { onPrev, projectKey } = this.props;
    firebase.database().ref(`projects/${projectKey}/title`).set('No title');
    onPrev();
  };

  render = () => (
    <Aux>
      <StepButtons
        onPrev={this.onPrev}
        onNext={this.props.onNext}
        last
      />
    </Aux>
  );
}
