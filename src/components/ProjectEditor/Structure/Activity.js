import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import Paper from 'material-ui/Paper';

const Item = glamorous(Paper)({
  marginBottom: 12,
  padding: 12,
  ':last-child': {
    marginBottom: 0
  }
});

const Title = glamorous.h4({
  marginTop: 0,
  marginBottom: 4,
  fontSize: 16
});

const Description = glamorous.p({
  margin: 0,
  fontSize: 14
});

export default class Activity extends Component {
  static propTypes = {
    activityKey: PropTypes.string.isRequired
  };

  state = {
    loading: true,
    activity: {}
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

  render = () => (
    <Item>
      <WithLoadingSpinner loading={this.state.loading}>
        <Title>{this.state.activity.name}</Title>
        {this.state.activity.description && (
          <Description>
            {this.state.activity.description.slice(0, 40)}
          </Description>
        )}
      </WithLoadingSpinner>
    </Item>
  );
}
