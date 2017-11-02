import React, { Component } from 'react';
import glamorous from 'glamorous';
import PageTitle from '../components/PageTitle';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import TemplateChooser from '../components/AddProject/TemplateChooser';
import SetTitle from '../components/AddProject/SetTitle';
import CustomizeProject from '../components/AddProject/CustomizeProject';

const StepContent = glamorous.section({
  paddingLeft: 14,
  paddingRight: 14,
  boxSizing: 'border-box'
});

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
        return (
          <SetTitle
            onPrev={this.handlePrev}
            onNext={this.handleNext}
            projectKey={this.state.projectKey}
          />
        );
      }
      case 2: {
        return (
          <CustomizeProject
            onPrev={this.handlePrev}
            onNext={this.handleNext}
            projectKey={this.state.projectKey}
          />
        );
      }
      default: {
        return (
          <TemplateChooser
            onNext={this.handleNext}
            setProjectKey={this.setProjectKey}
          />
        );
      }
    }
  };

  render = () => (
    <div>
      <PageTitle>Add project</PageTitle>
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
      <StepContent>
        {this.getStepContent()}
      </StepContent>
    </div>
  );
}
