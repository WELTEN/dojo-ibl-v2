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
import ActivityTypeSelect from './ActivityTypeSelect';
import ActivitySelector from '../ActivitySelector';
import Aux from 'react-aux';
import { Item, Title, Description } from '../../StyledActivity';
import injectFirebaseData from '../../InjectFirebaseData';
import {
  createInputInActivity,
  removeInputFromActivity,
  createChecklistInActivity,
  removeChecklistFromActivity
} from '../../../lib/Firebase';
import { NORMAL, INPUT, CHECKLIST, MULTI } from '../../../lib/activityTypes';

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
    type: NORMAL,
    childActivitiesKey: null,
    deletedChildActivitiesKey: null
  };

  getRef = () => firebase.database().ref(`activities/${this.props.activityKey}`);

  componentWillReceiveProps = (props) => {
    this.setState({
      type: props.data.type || NORMAL,
      childActivitiesKey: props.data.childActivitiesKey || null
    });
  };

  handleTypeChange = (e, index, value) => {
    if (value === MULTI) {
      const childActivitiesKey = this.createChildActivitiesKey();
      this.setState({ type: value, childActivitiesKey });
    } else {
      if (this.state.childActivitiesKey) {
        this.fakeDeleteChildActivitiesKey(this.state.childActivitiesKey);
      }
      this.setState({ type: value, childActivitiesKey: null });
    }
  };

  createChildActivitiesKey = () => {
    const deletedChildActivitiesKey = this.state.deletedChildActivitiesKey;
    if (deletedChildActivitiesKey) {
      this.setState({ deletedChildActivitiesKey: null });
      return deletedChildActivitiesKey;
    }
    return firebase.database().ref(`childActivities`).push().getKey();
  };

  fakeDeleteChildActivitiesKey = () =>
    this.setState({ deletedChildActivitiesKey: this.state.childActivitiesKey });

  deleteChildActivitiesKey = (key) =>
    firebase.database().ref(`childActivities/${key}`).remove();

  onEdit = () => setTimeout(() => this.setState({ editing: true }), 450);

  onEditSave = (name, description) => {
    this.setState({ editing: false });
    const { type, childActivitiesKey } = this.state;
    this.getRef().update({
      name,
      description,
      type,
      childActivitiesKey
    });

    const { activityKey, data } = this.props;
    if (type === data.type) return;

    switch (type) {
      case INPUT: {
        createInputInActivity(activityKey);
        if (data.checklist) {
          removeChecklistFromActivity(activityKey, data.checklist);
        }
        break;
      }
      case CHECKLIST: {
        createChecklistInActivity(activityKey);
        if (data.input) removeInputFromActivity(activityKey, data.input);
        break;
      }
      default: {
        if (data.input) removeInputFromActivity(activityKey, data.input);
        if (data.checklist) {
          removeChecklistFromActivity(activityKey, data.checklist);
        }
      }
    }

    if (this.state.deletedChildActivitiesKey) {
      this.deleteChildActivitiesKey(this.state.deletedChildActivitiesKey);
    }
  };

  onEditCancel = () => {
    this.setState({
      editing: false,
      type: this.props.data.type || NORMAL
    });

    if (this.state.childActivitiesKey && this.props.data.type !== MULTI) {
      this.setState({ childActivitiesKey: null });
      this.deleteChildActivitiesKey(this.state.childActivitiesKey);
    }

    if (this.state.deletedChildActivitiesKey && this.props.data.type === MULTI) {
      this.setState({
        childActivitiesKey: this.state.deletedChildActivitiesKey,
        deletedChildActivitiesKey: null
      });
    }
  };

  onDelete = () => setTimeout(() => this.setState({ deleting: true }), 450);

  onDeleteConfirm = () => {
    this.setState({ deleting: false });
    const { activityKey, phaseKey, data } = this.props;
    firebase.database().ref(`phases/${phaseKey}/activities/${activityKey}`).remove();
    if (data.input) removeInputFromActivity(activityKey, data.input);
    if (data.checklist) removeChecklistFromActivity(activityKey, data.checklist);
    if (data.childActivitiesKey) {
      this.deleteChildActivitiesKey(data.childActivitiesKey);
    }
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
              width={this.state.type === MULTI && 1152}
              inputContainerWidth={this.state.type === MULTI && 'calc(100% - 600px)'}
              contentBeforeInputs={() =>
                <div>
                  <ActivityTypeSelect
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                    width={this.state.type === MULTI && 'calc(100% - 600px)'}
                  />
                  {this.state.type === MULTI &&
                    <ActivitySelector
                      phaseKey={this.props.phaseKey}
                      activityKey={this.props.activityKey}
                      childActivitiesKey={this.state.childActivitiesKey}
                    />
                  }
                </div>
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
