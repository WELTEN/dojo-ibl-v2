import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import NameDescriptionPrompt from '../../NameDescriptionPrompt';
import Checkbox from 'material-ui/Checkbox';
import * as firebase from 'firebase';
import Aux from 'react-aux';
import {
  createInputInActivity,
  createChecklistInActivity
} from '../../../lib/Firebase';

const ButtonContainer = glamorous.footer({ textAlign: 'center' });

export default class AddActivity extends Component {
  static propTypes = {
    phaseKey: PropTypes.string.isRequired
  };

  state = {
    open: false,
    hasInputChecked: false,
    hasChecklistChecked: false
  };

  handleHasInputCheck = (e) => {
    this.setState({ hasInputChecked: e.target.checked });
  };

  handleHasChecklistCheck = (e) => {
    this.setState({ hasChecklistChecked: e.target.checked });
  };

  onOpen = () => this.setState({ open: true });

  onSave = (name, description) => {
    const key = firebase.database().ref('activities').push().getKey();
    firebase.database().ref(`phases/${this.props.phaseKey}/activities/${key}`).set(true);
    firebase.database().ref(`activities/${key}`).set({ name, description });

    if (this.state.hasInputChecked) createInputInActivity(key);
    if (this.state.hasChecklistChecked) createChecklistInActivity(key);

    this.onClose();
  };

  onClose = () => {
    this.setState({
      open: false,
      hasInputChecked: false,
      hasChecklistChecked: false
    });
  };

  render = () => (
    <ButtonContainer>
      <IconButton onClick={this.onOpen}>
        <Add />
      </IconButton>
      <NameDescriptionPrompt
        title="Add an activity"
        msg="Enter a name and/or a description for the new activity."
        open={this.state.open}
        contentBeforeInputs={() =>
          <Aux>
            <Checkbox
              label="Add user input field to activity"
              checked={this.state.hasInputChecked}
              onCheck={this.handleHasInputCheck}
            />
            <Checkbox
              label="Add checklist to activity"
              checked={this.state.hasChecklistChecked}
              onCheck={this.handleHasChecklistCheck}
            />
          </Aux>
        }
        onOk={this.onSave}
        onCancel={this.onClose}
        emptyOnOk
      />
    </ButtonContainer>
  );
}
