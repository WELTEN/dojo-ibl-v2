import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import NameDescriptionPrompt from '../../NameDescriptionPrompt';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as firebase from 'firebase';
import {
  createInputInActivity,
  createChecklistInActivity
} from '../../../lib/Firebase';
import { NORMAL, INPUT, CHECKLIST } from '../../../lib/activityTypes';
import { primaryColor } from '../../../styles';

const ButtonContainer = glamorous.footer({ textAlign: 'center' });

export default class AddActivity extends Component {
  static propTypes = {
    phaseKey: PropTypes.string.isRequired
  };

  state = {
    open: false,
    type: NORMAL
  };

  handleTypeChange = (e, index, value) => this.setState({ type: value });

  onOpen = () => this.setState({ open: true });

  onSave = (name, description) => {
    const type = this.state.type;
    const key = firebase.database().ref('activities').push().getKey();
    firebase.database().ref(`phases/${this.props.phaseKey}/activities/${key}`).set(true);
    firebase.database().ref(`activities/${key}`).set({
      name,
      description,
      type
    });

    // eslint-disable-next-line
    switch (type) {
      case INPUT: {
        createInputInActivity(key);
        break;
      }
      case CHECKLIST: {
        createChecklistInActivity(key);
        break;
      }
    }

    this.onClose();
  };

  onClose = () => {
    this.setState({
      open: false,
      type: NORMAL
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
          <SelectField
            floatingLabelText="Activity type"
            value={this.state.type}
            onChange={this.handleTypeChange}
            selectedMenuItemStyle={{ color: primaryColor }}
            fullWidth
          >
            <MenuItem value={NORMAL} primaryText="Normal" />
            <MenuItem value={INPUT} primaryText="With input" />
            <MenuItem value={CHECKLIST} primaryText="With checklist" />
          </SelectField>
        }
        onOk={this.onSave}
        onCancel={this.onClose}
        emptyOnOk
      />
    </ButtonContainer>
  );
}
