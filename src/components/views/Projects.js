import React, { Component } from 'react';

import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { Link, withRouter } from 'react-router-dom';
import { fire, db } from '../../fire.js';
import IboxContent from '../common/IboxContent';
import matchSorter from 'match-sorter'

class Projects extends Component {

  constructor(props) {
    super(props);
    this.state = { projects: [] }; // <- set up react state
  }

  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let projectsRef = db.ref('projects').orderByKey();
    projectsRef.on('value', function(dataSnapshot) {
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


    const columns = [{
      Header: 'Project title',
      accessor: 'title',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["title"] }),
      filterAll: true
    },{
      Header: 'Project description',
      accessor: 'description',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["description"] }),
      filterAll: true
    }]
    return (
      <div>
        <div className="row wrapper page-heading m-t">
          <Link className="btn btn-w-m btn-info put-item-timeline-right" to="/catalogue"><i className="fa fa-plus"></i> <span className="nav-label">Create new project</span></Link>
        </div>
        <IboxContent title="Projects">
          <ReactTable
            data={ this.state.projects }
            columns={columns}
            defaultPageSize={10}
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id]) === filter.value}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  // console.log('A Td Element was clicked!')
                  // console.log('it produced this event:', e)
                  // console.log('It was in this column:', column)
                  // console.log('It was in this row:', rowInfo)
                  // console.log('It was in this table instance:', instance)

                  this.props.history.push('/project/'+ rowInfo.original.key);

                  // IMPORTANT! React-Table uses onClick internally to trigger
                  // events like expanding SubComponents and pivots.
                  // By default a custom 'onClick' handler will override this functionality.
                  // If you want to fire the original onClick handler, call the
                  // 'handleOriginal' function.
                  if (handleOriginal) {
                    handleOriginal()
                  }
                }
              }
            }}
          />
        </IboxContent>
      </div>
      )
  }

}

export default withRouter(Projects)
