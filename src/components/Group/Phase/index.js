import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import PhaseTitle from './PhaseTitle';
import LoadingSpinner from '../../LoadingSpinner';
import injectFirebaseData from '../../InjectFirebaseData';
import { transition } from '../../../styles';

const Item = glamorous.section({
  marginBottom: 24,
  ':last-child': {
    marginBottom: 68
  }
}, ({ collapsed }) => {
  if (collapsed) return { marginBottom: 12 };
});

const PhaseContent = glamorous.div({
  height: 'auto',
  transition,
  overflow: 'hidden',
  opacity: 1,
}, ({ collapsed }) => {
  if (collapsed) return { height: 0, opacity: 0 };
});

class Phase extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
    phaseKey: PropTypes.string.isRequired,
    isFirst: PropTypes.bool.isRequired
  };

  state = { collapsed: !this.props.isFirst };

  onCollapseToggle = () => this.setState({ collapsed: !this.state.collapsed });

  render = () => {
    const { loading, data } = this.props;
    const collapsed = this.state.collapsed;
    if (loading) return <LoadingSpinner />
    return (
      <Item collapsed={collapsed}>
        <PhaseTitle
          title={data.name}
          collapsed={collapsed}
          onCollapseToggle={this.onCollapseToggle}
        />
        <PhaseContent collapsed={collapsed}>
          {JSON.stringify(data.activities)}
        </PhaseContent>
      </Item>
    );
  };
}

const getRef = props => firebase.database().ref(`phases/${props.phaseKey}`);

export default injectFirebaseData(Phase, getRef);
