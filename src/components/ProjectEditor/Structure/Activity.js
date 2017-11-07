import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import LoadingSpinner from '../../LoadingSpinner';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditActivity from './EditActivity';
import Confirm from '../../Confirm';
import Aux from 'react-aux';

const Item = glamorous(Paper)({
  position: 'relative',
  marginBottom: 12,
  padding: 12,
  ':last-child': {
    marginBottom: 0
  }
});

const Title = glamorous.h4({
  margin: 0,
  lineHeight: '24px',
  fontSize: 16,
});

const Description = glamorous.p({
  margin: 0,
  fontSize: 14
});

const ActionsButton = glamorous(IconButton)({
  position: 'absolute !important',
  bottom: 0,
  right: 0
});

export default class Activity extends Component {
  static propTypes = {
    activityKey: PropTypes.string.isRequired,
    phaseKey: PropTypes.string.isRequired
  };

  state = {
    loading: true,
    activity: {},
    editing: false,
    deleting: false
  };

  getRef = () => firebase.database().ref(`activities/${this.props.activityKey}`);

  componentDidMount = () => {
    this.getRef().on('value', (snapshot) => {
      this.setState({
        loading: false,
        activity: snapshot.val()
      });
    });
  };

  componentWillUnmount = () => this.getRef().off();

  onEdit = () => setTimeout(() => this.setState({ editing: true }), 450);
  onEditClose = () => this.setState({ editing: false });

  onDelete = () => setTimeout(() => this.setState({ deleting: true }), 450);

  onDeleteConfirm = () => {
    this.setState({ deleting: false });
    const { activityKey, phaseKey } = this.props;
    firebase.database().ref(`phases/${phaseKey}/activities/${activityKey}`).remove();
    this.getRef().remove();
  };

  onDeleteCancel = () => this.setState({ deleting: false });

  render = () => {
    if (this.state.activity == null) return null;
    return (
      <Item>
        {this.state.loading ? (
          <LoadingSpinner />
        ) : (
          <Aux>
            <Title>{this.state.activity.name}</Title>
            {this.state.activity.description && (
              <Description>
                {this.state.activity.description.slice(0, 40)}
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
            <EditActivity
              activity={this.state.activity}
              activityKey={this.props.activityKey}
              open={this.state.editing}
              onClose={this.onEditClose}
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
