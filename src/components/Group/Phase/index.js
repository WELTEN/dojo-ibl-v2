import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import LoadingSpinner from '../../LoadingSpinner';
import PhaseTitle from './PhaseTitle';
import PhaseActivities from './PhaseActivities';
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
  opacity: 1
}, ({ collapsed }) => {
  if (collapsed) return {
    height: 0,
    opacity: 0,
    overflow: 'hidden'
  };
});

class Phase extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
    phaseKey: PropTypes.string.isRequired,
    isFirst: PropTypes.bool.isRequired,
    group: PropTypes.object.isRequired,
  };

  state = { collapsed: !this.props.isFirst };

  onCollapseToggle = () => this.setState({ collapsed: !this.state.collapsed });

  getActivityCount = () => Object.keys(this.props.data.activities || {}).length;

  render = () => {
    const { loading, data, group } = this.props;
    const collapsed = this.state.collapsed;

    if (loading) return <LoadingSpinner />

    const activityCount = this.getActivityCount();
    return (
      <Item collapsed={collapsed && activityCount !== 0}>
        <PhaseTitle
          title={data.name}
          collapsed={collapsed}
          onCollapseToggle={this.onCollapseToggle}
          activityCount={activityCount}
        />
        {activityCount > 0 &&
          <PhaseContent collapsed={collapsed}>
            <PhaseActivities phase={data} group={group} />
          </PhaseContent>
        }
      </Item>
    );
  };
}

const getRef = props => firebase.database().ref(`phases/${props.phaseKey}`);

export default injectFirebaseData(Phase, getRef, true);
