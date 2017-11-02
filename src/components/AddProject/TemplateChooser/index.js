import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import StepButtons from '../StepButtons';
import TemplateOverview from './TemplateOverview';
import { flattenFirebaseList } from '../../../lib/Firebase';

export default class TemplateChooser extends Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired
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

  onChoose = (template) => {
    console.log(template)
    console.log(this.state.templates[template])
  };

  render = () => (
    <WithLoadingSpinner loading={this.state.loading}>
      <TemplateOverview
        templates={flattenFirebaseList(this.state.templates)}
        onChoose={this.onChoose}
      />
      <StepButtons
        onNext={this.props.onNext}
        prevDisabled
      />
    </WithLoadingSpinner>
  );
}
