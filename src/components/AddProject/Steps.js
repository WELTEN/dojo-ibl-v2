import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import Aux from 'react-aux';
import StepContent from './StepContent';

export default class Steps extends Component {
  state = {
    stepIndex: 0,
    finished: false
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
        finished: false
      });
    }
  };

  render = () => (
    <Aux>
      <Stepper activeStep={this.state.stepIndex}>
        <Step>
          <StepLabel>Choose template</StepLabel>
        </Step>
        <Step>
          <StepLabel>Enter project title</StepLabel>
        </Step>
        <Step>
          <StepLabel>Customize project</StepLabel>
        </Step>
      </Stepper>
      <StepContent
        onPrev={this.handlePrev}
        onNext={this.handleNext}
        stepIndex={this.state.stepIndex}
        finished={this.state.finished}
      />
    </Aux>
  );
}
