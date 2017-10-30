import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IboxContent from '../../common/IboxContent';
import PhaseActivities from './PhaseActivities';
import { db, fireba, auth } from '../../../fire.js';
import { flattenFirebaseList } from '../../../helpers/FlattenList.js';
import { FormControl, ControlLabel, FormGroup, InputGroup, Button } from 'react-bootstrap';

class ProjectStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phases: [],
      phaseName: '',
      errorName: null,
      errorDescription: null
    };
  }

  componentDidMount() {
    const { project, projectId } = this.props;
    db.ref(`projects/${projectId}/phases`).on('value', (snapshot) => {
      this.setState({ phases: flattenFirebaseList(snapshot.val() || {}) });
    });
  }

  componentWillUnmount() {
    const { project, projectId } = this.props;
    db.ref(`projects/${projectId}/phases`).off();
  }


  addPhase(){

    var postData = {
        title: this.state.phaseName
    };

    // Get a key for a new Post.
    var newPostKey = db.ref(`projects/${this.props.projectId}/phases`).push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[`projects/${this.props.projectId}/phases/${newPostKey}`] = postData;

    title: this.state.phaseName = '';
    return db.ref().update(updates);
  }

  handlePhaseNameChange = (e) => this.setState({ phaseName: e.target.value });

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addPhase();
    }
  }

  handleRemoveItem(phase) {
    const { projectId } = this.props;

    db.ref(`projects/${projectId}/phases/${phase}/activities`).on('value', (snapshot) => {
      Object.keys(snapshot.val() || {}).map((key) =>
        db.ref(`activities/${key}`).remove()
      )
    });
    return db.ref(`projects/${this.props.projectId}/phases/${phase}`).remove()
  }

  render() {
    var phaseItems = this.state.phases.map((phase, i) => {
      return (
        <section key={i}>
          <h3>
              <a> <i className="fa fa-times pull-right" onClick={this.handleRemoveItem.bind(this, phase.key)}></i> </a>
              <a> <span>{i}. { phase.title }</span></a>
          </h3>
          <PhaseActivities phase={phase.key} project={this.props.projectId} />
        </section>
      )
    });

    return (
        <div className="row show-grid" >
          { phaseItems }
          <aside>
            <FormGroup validationState={this.state.errorName}>
              <InputGroup>
                <FormControl type="text"
                onKeyPress={this._handleKeyPress}
                value={this.state.phaseName}
                onChange={this.handlePhaseNameChange} />
                <FormControl.Feedback />
                <InputGroup.Button>
                  <Button  onClick={this.addPhase.bind(this)}>Add phase</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </aside>

      </div>
  )}
}

export default ProjectStructure
