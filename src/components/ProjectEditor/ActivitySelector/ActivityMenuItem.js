import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import MenuItem from 'material-ui/MenuItem'
import * as firebase from 'firebase';

export default class ActivityMenuItem extends Component {
  // Otherwise Material-UI will act weird
  static muiName = 'MenuItem';

  static propTypes = {
    activityKey: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired
  };

  state = {
    loading: true,
    activity: {}
  };

  // We can't use injectFirebaseData due to Material-UI acting weird
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

  render = () => {
    const { checked, activityKey, ...props } = this.props;

    if (this.state.loading) return (
      <CircularProgress
        size={24}
        thickness={2.5}
        style={{ marginTop: 4, marginBottom: 4, marginLeft: 64 }}
      />
    );

    return (
      <MenuItem
        className="menu-item"
        primaryText={this.state.activity.name}
        value={activityKey}
        checked={checked}
        insetChildren
        {...props}
      />
    );
  };
}
