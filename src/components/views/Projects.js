import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { fire } from '../../fire.js';
import IboxContent from '../common/IboxContent';

class Projects extends Component {

  constructor(props) {
    super(props);
    this.state = { projects: [] }; // <- set up react state
  }

  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let projectsRef = fire.database().ref('projects').orderByKey();
    projectsRef.limitToLast(25).on('value', function(dataSnapshot) {
        var projects = [];
        dataSnapshot.forEach(function(childSnapshot) {
            var project = childSnapshot.val();
            project['key'] = childSnapshot.key;
            projects.push(project);
        });

        this.setState({
            loadingProjectsCreated: false,
            projects: projects
        });

    }.bind(this));
  }

  render() {
    var projectItems = this.state.projects.map((project) => {

      return (
        <tr key={project.key}>
          <td>
              <a href="#/project/{ game.gameId }/edit/structure">{ project.title }</a>
          </td>
          <td>{ project.description }</td>
          <td>
          </td>
          <td className="text-right">
              <div className="btn-group">
                  <button data-toggle="dropdown" className="btn btn-default btn-sm dropdown-toggle">Action <span className="caret"></span></button>
                  <ul className="dropdown-menu">
                      <li><Link to={'/project/'+project.key }>Clone</Link></li>
                      <li className="divider"></li>
                      <li><Link to={'/project/'+project.key }>Remove</Link></li>
                  </ul>
              </div>
              <div className="btn-group">
                  <a href="#/project/{ project.gameId }/edit/structure" className="btn-white btn btn-sm"><i className="fa fa-pencil"/>Edit</a>
              </div>
          </td>
        </tr>
      )
    });

    return (
      <IboxContent title="Projects">
        <table className="footable table table-stripped toggle-arrow-tiny" data-page-size="10">
          <thead>
            <tr>
                <th data-toggle="true">Inquiry Name</th>
                <th data-hide="phone">Description</th>
                <th data-hide="phone">Date</th>
                <th className="text-right" data-sort-ignore="true">Action</th>
            </tr>
          </thead>
          <tbody>
            { projectItems }
          </tbody>
          <tfoot>
            <tr>
                <td colSpan="6">
                    <ul className="pagination pull-right"></ul>
                </td>
            </tr>
          </tfoot>
        </table>
      </IboxContent>
      )
  }

}

export default Projects
