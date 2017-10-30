import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import { db, auth } from '../../../fire.js';

import { FormControl, ControlLabel, FormGroup, InputGroup, Button } from 'react-bootstrap';


class Metadata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.project.title,
      description: props.project.description,
      errorName: null,
      errorDescription: null
    };
  }

  handleTitleChange = (e) => this.setState({ title: e.target.value });
  handleDescriptionChange = (e) => this.setState({ description: e.target.value });

  onSave = () => {
    if (!this.state.title.trim()) {
      this.setState({ errorName: 'error' });
      return;
    }

    if (!this.state.description.trim()) {
      this.setState({ errorDescription: 'error' });
      return;
    }

    this.setState({ errorName: null });
    this.setState({ errorDescription: null });

    var user = auth.currentUser.uid;

    db.ref(`projects/${this.props.projectId}`).update({
      title: this.state.title,
      description: this.state.description
    });

  }

  render() {
    return (
      <div>
        <div className="ibox-content profile-content">
          <form onSubmit={this.handleSubmit}>
            <FormGroup validationState={this.state.errorName}>
              <ControlLabel>Project title</ControlLabel>
              <InputGroup>
                <FormControl type="text"
                value={this.state.title}
                onChange={this.handleTitleChange} />
                <FormControl.Feedback />
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea" validationState={this.state.errorDescription}>
              <ControlLabel>Project description</ControlLabel>
              <FormControl componentClass="textarea" placeholder="textarea"
              value={this.state.description}
              onChange={this.handleDescriptionChange} />
            </FormGroup>
          </form>
          <button onClick={this.onSave} className="btn btn-primary">Save</button>
        </div>

      </div>
  )}
}
//
// <div className="col-md-5">
//   <form>
//     <FormGroup>
//       <ControlLabel>Roles</ControlLabel>
//       <InputGroup>
//         <FormControl type="text" />
//         <InputGroup.Button>
//           <Button>Add</Button>
//           <Button>Save</Button>
//         </InputGroup.Button>
//       </InputGroup>
//     </FormGroup>
//   </form>
//   <ul className="tag-list" >
//       <li ng-repeat="role in game.config.roles2 track by $index"><a href=""  >
//           <i className="fa fa-circle" ></i> 5435</a></li>
//       <li ng-show="game.config.roles2 == 0"><a href=""><i className="fa fa-tag"></i> No roles</a></li>
//   </ul>
//
// </div>

export default Metadata
