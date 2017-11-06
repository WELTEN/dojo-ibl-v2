import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import { grey300 } from 'material-ui/styles/colors';
import Activities from './Activities';

const Item = glamorous.div({
  marginTop: 24,
  marginBottom: 24,
  paddingLeft: 12,
  paddingRight: 12,
  width: 'calc(25% - 26px)',
  borderRight: `2px solid ${grey300}`,
  ':last-child': {
    borderRight: 0
  }
});

const Title = glamorous.h3({
  marginTop: 0,
  marginBottom: 12
});

export default class Phase extends Component {
  static propTypes = {
    phaseKey: PropTypes.string.isRequired
  };

  state = {
    loading: true,
    phase: {}
  };

  getRef = () => firebase.database().ref(`phases/${this.props.phaseKey}`);

  componentDidMount = () => {
    this.getRef().on('value', (snapshot) => {
      this.setState({
        loading: false,
        phase: snapshot.val()
      });
    });
  };

  componentWillUnmount = () => this.getRef().off();

  render = () => (
    <Item>
      <WithLoadingSpinner loading={this.state.loading}>
        <Title>{this.state.phase.name}</Title>
        {this.state.phase.activities && (
          <Activities activities={this.state.phase.activities} />
        )}
      </WithLoadingSpinner>
    </Item>
  );
}
