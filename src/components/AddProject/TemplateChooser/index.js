import React, { Component } from 'react';
import * as firebase from 'firebase';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import StepButtons from '../StepButtons';

export default class TemplateChooser extends Component {
  state = {
    loading: true,
    templates: []
  };

  componentDidMount = () => {
    firebase.database().ref('templates').once('value', (snapshot) => {
      this.setState({
        loading: false,
        templates: Object.values(snapshot.val() || {})
      });
    });
  };

  render = () => (
    <WithLoadingSpinner loading={this.state.loading}>
      <div>
        {JSON.stringify(this.state.templates)}
      </div>
      <StepButtons
        onNext={this.props.onNext}
        prevDisabled
      />
    </WithLoadingSpinner>
  );
}
