import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import { db, auth, base} from '../../../fire.js';
import EditActivity from './EditActivity.js';

class Activity extends React.Component {

  state = {
    loading: true,
    editing: false,
    challenge: null
  };

  componentDidMount() {
    const key = this.props.activityKey;
    db.ref(`activities/${key}`).on('value', (snapshot) => {
      this.setState({ activity: snapshot.val(), loading: false });
    });
  }

  componentWillUnmount() {
    const key = this.props.activityKey;
    db.ref(`activities/${key}`).off();
  }

  handleRemoveItem(activity) {
    let project = activity.project;
    let phase = activity.phase;
    let key = activity.key;

    db.ref(`projects/${project}/phases/${phase}/activities/${key}`).remove();
    return db.ref(`activities/${key}`).remove()
  }

  onEditClose = () => this.setState({ editing: false });

  handleTitleChange = (e) => this.setState({ title: e.target.value });
  handleDescriptionChange = (e) => this.setState({ description: e.target.value });

  render() {
    const { activity, editing } = this.state;
    if (!activity) return null;
    activity.key = this.props.activityKey;
    return (
      <li>
          <EditActivity
            show={editing}
            onClose={this.onEditClose}/>
          <a><i className="fa fa-times pull-right" onClick={this.handleRemoveItem.bind(this, activity)}></i></a>
          <i className="fa fa-tasks"></i> <a> {activity.title}</a>
          <br/>
          <p className="small">{activity.description}</p>
          <div className="agile-detail">
            <span className="pull-right btn btn-xs btn-white">Role</span>
            <i className="fa fa-clock-o"></i> Time
          </div>
      </li>

  )}
}

export default Activity
