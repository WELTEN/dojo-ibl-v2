import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { fire, db } from '../../fire.js';
import IboxContent from '../common/IboxContent';
import Metadata from './Project/Metadata';
import ProjectStructure from './Project/ProjectStructure';

import styles from './../../styles/styleProject.css';

import { Tabs, Tab, Na } from 'react-bootstrap';

class Project extends Component {

  constructor(props){
      super(props);
      this.state = {
          project: {},
          loading: true
      };
   }

  componentDidMount() {
      let projectRef = db.ref('projects/' + this.props.match.params.projectId);
      projectRef.on('value', function(dataSnapshot) {
          this.setState({
              loading: false,
              project: dataSnapshot.val()
          });

          console.log(this.state.project);
      }.bind(this));
  }

  getInitialState() {
      return {
        key: 2
      };
    }

    handleSelect(key) {
      // alert('selected ' + key);
      this.setState({key});
    }



  render() {

    return (
      <div>
        <div className="row wrapper page-heading m-t">
          <Link className="btn btn-w-m btn-info put-item-timeline-right" to="/catalogue"><i className="fa fa-plus"></i> <span className="nav-label">Back</span></Link>
        </div>
        <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
          <Tab eventKey={1} title="About the project">
            <Metadata project={this.state.project} />
          </Tab>
          <Tab eventKey={2} title="Structure">
            <ProjectStructure  />
          </Tab>
          <Tab eventKey={3} title="Calendar" >Tab 3 content</Tab>
          <Tab eventKey={4} title="Groups" >Tab 3 content</Tab>
          <Tab eventKey={5} title="Project management" disabled>Tab 3 content</Tab>
        </Tabs>
      </div>
      )
  }
}

export default withRouter(Project)
