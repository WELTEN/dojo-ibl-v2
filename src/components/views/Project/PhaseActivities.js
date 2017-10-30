import React, { Component } from 'react';
import { db, fireba, auth, base } from '../../../fire.js';

import Activity from './Activity'
import AddActivity from './AddActivity'

var Rebase = require('re-base');

class PhaseActivities extends React.Component {

  state = {
    activitiesKeys: []
  };

  componentDidMount() {
    const { phase, project } = this.props;
    db.ref(`projects/${project}/phases/${phase}/activities`).on('value', (snapshot) => {
      this.setState({ activitiesKeys: Object.keys(snapshot.val() || {}) });
    });
  }

  render() {
    const { phase, project } = this.props;
    return (
      <ul ui-sortable="sortableOptions" className="sortable-list connectList agile-list ui-sortable">
        {this.state.activitiesKeys.map((key) =>
          <Activity key={key} activityKey={key} />
        )}
        <AddActivity phase={phase} project={project} />
      </ul>
  )}
}

export default PhaseActivities
