import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import Paper from 'material-ui/Paper';
import { red500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Confirm from '../../Confirm';

const Item = glamorous(Paper)({
  position: 'relative',
  marginBottom: 12,
  padding: 12,
  cursor: 'pointer',
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

const DeleteButton = glamorous(IconButton)({
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

  onDelete = () => this.setState({ deleting: true });

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
        <WithLoadingSpinner loading={this.state.loading}>
          <Title>{this.state.activity.name}</Title>
          {this.state.activity.description && (
            <Description>
              {this.state.activity.description.slice(0, 40)}
            </Description>
          )}
          <DeleteButton iconStyle={{ color: red500 }} onClick={this.onDelete}>
            <Close />
          </DeleteButton>
          <Confirm
            title="Confirm activity deletion"
            msg="After you delete an activity, there's no way back!"
            open={this.state.deleting}
            onOk={this.onDeleteConfirm}
            onCancel={this.onDeleteCancel}
          />
        </WithLoadingSpinner>
      </Item>
    );
  };
}
