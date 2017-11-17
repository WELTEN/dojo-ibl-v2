import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import LoadingSpinner from '../../LoadingSpinner';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NameDescriptionPrompt from '../../NameDescriptionPrompt';
import Confirm from '../../Confirm';
import Checkbox from 'material-ui/Checkbox';
import Aux from 'react-aux';
import { Item, Title, Description } from '../../StyledActivity';
import injectFirebaseData from '../../InjectFirebaseData';
import {
  createInputInActivity,
  removeInputFromActivity,
  createChecklistInActivity,
  removeChecklistFromActivity
} from '../../../lib/Firebase';

const ActionsButton = glamorous(IconButton)({
  position: 'absolute !important',
  bottom: 0,
  right: 0
});

class Activity extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
    activityKey: PropTypes.string.isRequired,
    phaseKey: PropTypes.string.isRequired
  };

  state = {
    editing: false,
    deleting: false,
    hasInputChecked: false,
    hasChecklistChecked: false
  };

  getRef = () => firebase.database().ref(`activities/${this.props.activityKey}`);

  componentWillReceiveProps = (props) => {
    if (props.data.input) this.setState({ hasInputChecked: true });
    if (props.data.checklist) this.setState({ hasChecklistChecked: true });
  };

  handleHasInputCheck = (e) => {
    this.setState({ hasInputChecked: e.target.checked });
  };

  handleHasChecklistCheck = (e) => {
    this.setState({ hasChecklistChecked: e.target.checked });
  };

  onEdit = () => setTimeout(() => this.setState({ editing: true }), 450);

  onEditSave = (name, description) => {
    this.setState({ editing: false });
    this.getRef().update({
      name,
      description
    });

    const { activityKey, data } = this.props;
    if (this.state.hasInputChecked && !data.input) {
      createInputInActivity(activityKey);
    }
    if (this.state.hasChecklistChecked && !data.checklist) {
      createChecklistInActivity(activityKey);
    }
    if (!this.state.hasInputChecked && data.input) {
      removeInputFromActivity(activityKey, data.input);
    }
    if (!this.state.hasChecklistChecked && data.checklist) {
      removeChecklistFromActivity(activityKey, data.checklist);
    }
  };

  onEditCancel = () => {
    this.setState({
      editing: false,
      hasInputChecked: false,
      hasChecklistChecked: false
    });
  };

  onDelete = () => setTimeout(() => this.setState({ deleting: true }), 450);

  onDeleteConfirm = () => {
    this.setState({ deleting: false });
    const { activityKey, phaseKey } = this.props;
    firebase.database().ref(`phases/${phaseKey}/activities/${activityKey}`).remove();
    this.getRef().remove();
  };

  onDeleteCancel = () => this.setState({ deleting: false });

  render = () => {
    if (this.props.data === null) return null;
    return (
      <Item>
        {this.props.loading ? (
          <LoadingSpinner />
        ) : (
          <Aux>
            <Title>{this.props.data.name}</Title>
            {this.props.data.description && (
              <Description hasActionButton>
                {this.props.data.description}
              </Description>
            )}
            <IconMenu
              style={{ position: 'initial', display: 'block' }}
              iconButtonElement={<ActionsButton><MoreVertIcon /></ActionsButton>}
              useLayerForClickAway
            >
              <MenuItem primaryText="Edit" onClick={this.onEdit} />
              <MenuItem primaryText="Delete" onClick={this.onDelete} />
            </IconMenu>
            <NameDescriptionPrompt
              title="Edit activity"
              msg="Change the activity name/description"
              nameValue={this.props.data.name}
              descriptionValue={this.props.data.description}
              open={this.state.editing}
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
              onOk={this.onEditSave}
              onCancel={this.onEditCancel}
            />
            <Confirm
              title="Confirm activity deletion"
              msg="After you delete an activity, there's no way back!"
              open={this.state.deleting}
              onOk={this.onDeleteConfirm}
              onCancel={this.onDeleteCancel}
            />
          </Aux>
        )}
      </Item>
    );
  };
}

const getRef = props => firebase.database().ref(`activities/${props.activityKey}`);

export default injectFirebaseData(Activity, getRef);
