import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

import { FormControl, ControlLabel, FormGroup, InputGroup, Button } from 'react-bootstrap';


class Metadata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: this.props.project
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="ibox-content profile-content col-md-7">
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel>Project title</ControlLabel>
              <InputGroup>
                <FormControl type="text" value={this.state.project.title} onChange={this.handleChange} />
                <InputGroup.Button>
                  <Button>Save</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Project description</ControlLabel>
              <FormControl componentClass="textarea" placeholder="textarea" value={this.props.project.description} />
            </FormGroup>
          </form>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
        <div className="col-md-5">
          <form>
            <FormGroup>
              <ControlLabel>Roles</ControlLabel>
              <InputGroup>
                <FormControl type="text" />
                <InputGroup.Button>
                  <Button>Add</Button>
                  <Button>Save</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </form>
          <ul className="tag-list" >
              <li ng-repeat="role in game.config.roles2 track by $index"><a href=""  >
                  <i className="fa fa-circle" ></i> 5435</a></li>
              <li ng-show="game.config.roles2 == 0"><a href=""><i className="fa fa-tag"></i> No roles</a></li>
          </ul>

        </div>
      </div>
  )}
}

export default Metadata
