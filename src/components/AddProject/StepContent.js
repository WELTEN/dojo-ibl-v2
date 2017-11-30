import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import TemplateChooser from './TemplateChooser';
import SetTitle from './SetTitle';
import CustomizeProject from './CustomizeProject';
import Done from './Done';

const Content = glamorous.section({
  paddingLeft: 14,
  paddingRight: 14,
  boxSizing: 'border-box'
});

export default class StepContent extends Component {
  static propTypes = {
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    stepIndex: PropTypes.number.isRequired,
    finished: PropTypes.bool.isRequired
  };

  state = { projectKey: null };

  setProjectKey = key => this.setState({ projectKey: key });

  getStepContent = () => {
    const { onPrev, onNext, stepIndex, finished } = this.props;

    if (finished) return (
      <Done
        onPrev={onPrev}
        projectKey={this.state.projectKey}
      />
    );

    switch (stepIndex) {
      case 1: {
        return (
          <SetTitle
            onPrev={onPrev}
            onNext={onNext}
            projectKey={this.state.projectKey}
          />
        );
      }
      case 2: {
        return (
          <CustomizeProject
            onPrev={onPrev}
            onNext={onNext}
            projectKey={this.state.projectKey}
          />
        );
      }
      default: {
        return (
          <TemplateChooser
            onNext={onNext}
            setProjectKey={this.setProjectKey}
          />
        );
      }
    }
  };

  render = () => (
    <Content>
      {this.getStepContent()}
    </Content>
  );
}
