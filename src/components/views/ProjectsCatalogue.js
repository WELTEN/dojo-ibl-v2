import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { db, fireba, auth } from '../../fire.js';
import IboxContent from '../common/IboxContent';

class ProjectsCatalogue extends Component {

  constructor(props) {
    super(props);
    this.state = {
      templates: [],
      title: 'Change title',
      description: 'change description'
    };
  }

  componentDidMount(){

    let templatesRef = db.ref('catalogue').orderByKey();
    templatesRef.limitToLast(25).on('value', function(dataSnapshot) {
        var templates = [];
        dataSnapshot.forEach(function(childSnapshot) {
            var project = childSnapshot.val();
            project['key'] = childSnapshot.key;
            templates.push(project);
        });

        this.setState({
            loadingProjectsCreated: false,
            templates: templates
        });

    }.bind(this));
  }

  _addProject(template){

    var userId = auth.currentUser.uid;

    console.log(auth.currentUser);

    var postData = {
        title: this.state.title,
        description: this.state.description,
        timestamp: fireba.database.ServerValue.TIMESTAMP,
        author: auth.currentUser.displayName,
        owner: userId,
        editors: 0,
        phases: [{
          title: "phase 1"
        }]
    };

    // Get a key for a new Post.
    var newPostKey = db.ref('projects').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/projects/' + newPostKey] = postData;
    updates['/users/' + userId + '/projectowner/' + newPostKey] = true;

    this.props.history.push('/project/'+ newPostKey);

    return db.ref().update(updates);
  }

  // _addProject(uid, username, picture, title, description) {
  //         // A post entry.
  //         var postData = {
  //             author: username,
  //             owner: uid,
  //             description: description,
  //             title: title,
  //             editors: 1,
  //             phases: [{}]
  //         };
  //
  //         // Get a key for a new Post.
  //         var newPostKey = db.ref().child('projects').push().key;
  //
  //         // Write the new post's data simultaneously in the posts list and the user's post list.
  //         var updates = {};
  //         updates['/projects/' + newPostKey] = postData;
  //         updates['/users/' + uid + '/projectowner/' + newPostKey] = postData;
  //
  //         return db.ref().update(updates);
  //     }

      // newProjectCurrentUser() {
      //
      //     var _self = this;
      //
      //     var userId = auth.currentUser.uid;
      //     return db.ref('/users/' + userId).once('value').then(function(snapshot) {
      //         var username = snapshot.val().username;
      //
      //         return _self._addProject(
      //             auth.currentUser.uid, username,
      //             auth.currentUser.photoURL,
      //             _self.state.title,
      //             _self.state.description);
      //     });
      // }

  render() {

    const contentStyle = {
        display: "flex"
    };

    var projectItems = this.state.templates.map((template, i) => {

      return (
        <IboxContent size="4" key={i} title={ template.inquiry }>
          <h2 className="font-bold m-b-xs">
              { template.inquiry }
          </h2>
          <small>{ template.author }</small>
          <div className="m-t-md">
              <small className="text-muted">{ template.purpose }</small>
          </div>
          <hr />

          <h4>Inquiry structure description</h4>

          <div className="small text-muted">
              { template.description }
          </div>
          <hr />

          <h4>Phases of the inquiry</h4>

          <div className="mail-tools tooltip-demo m-t-md">

            { template.phases ? template.phases.map((phase) => {
                <div className="m-xxs btn btn-white btn-sm" ><i className="fa fa-square"></i> { phase.phase }</div>
              }) : "No phases"
            }

          </div>
          <hr />

          <div className="text-right">
              <div className="btn-group">
                  <button className="btn btn-primary btn-sm" onClick={this._addProject.bind(this, template)} ><i className="fa fa-copy"></i> Reuse structure</button>
                  <a target="_blank" href={ template.paper_url } className="btn btn-white btn-sm"><i className="fa fa-info"></i> More info </a>
              </div>
          </div>
        </IboxContent>
      )
    });

    return (
      <div >
        { projectItems }
      </div>
      )
  }

}

export default withRouter(ProjectsCatalogue)
