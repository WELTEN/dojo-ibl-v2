import React, { Component } from 'react';
import PageTitle from '../components/PageTitle';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import TemplateChooser from '../components/AddProject/TemplateChooser';

export default class AddProject extends Component {
  state = {
    stepIndex: 0,
    projectKey: null
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
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  setProjectKey = key => this.setState({ projectKey: key });

  getStepContent = () => {
    if (this.state.finished) return <h1>ok</h1>

    switch (this.state.stepIndex) {
      case 1: {
        return 'egdfg'
      }
      case 2: {
        return 'dsf'
      }
      default: {
        return <TemplateChooser onNext={this.handleNext} />
      }
    }
  };

  render = () => (
    <div>
      <PageTitle>Add project</PageTitle>
      <Stepper activeStep={this.state.stepIndex}>
        <Step>
          <StepLabel>Select template</StepLabel>
        </Step>
        <Step>
          <StepLabel>Enter project title</StepLabel>
        </Step>
        <Step>
          <StepLabel>Customize project</StepLabel>
        </Step>
      </Stepper>
      <div>
        {this.getStepContent()}
      </div>
    </div>
  );
}
