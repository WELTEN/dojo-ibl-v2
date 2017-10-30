import React, { Component } from 'react';
import { db, auth, base} from '../../../fire.js';
import { FormControl, ControlLabel, FormGroup, InputGroup, Button } from 'react-bootstrap';

class AddActivity extends React.Component {

  state = {
    loading: true,
    activity: null,
    title: ''
  };

  handleAddActivity(title, phase, project){
    const key = db.ref(`activities`).push({
      title: title,
      phase: phase,
      project: project,
      creationDate: Date.now()
    }).getKey();
    db.ref(`projects/${project}/phases/${phase}/activities/${key}`).set(true);

    this.state.title = ''
  }

  handleActivityNameChange = (e) => this.setState({ title: e.target.value });

  handleKeyPress = (e, title, phase, project) => {
    if (e.key === 'Enter') {
      this.handleAddActivity(title, phase, project);
    }
  }

  render() {
    const phase = this.props.phase;
    const project = this.props.project;

    return (
      <FormGroup validationState={this.state.errorName}>
        <InputGroup>
          <FormControl type="text"
          onKeyPress={this.handleKeyPress.bind(this, this.state.title, phase, project)}
          value={this.state.title}
          onChange={this.handleActivityNameChange} />
          <FormControl.Feedback />
          <InputGroup.Button>
            <Button className="btn btn-warning" onClick={this.handleAddActivity.bind(this, this.state.title, phase, project)}> <i className="fa fa-plus"/></Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
  )}
}

export default AddActivity
