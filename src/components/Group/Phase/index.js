import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import PhaseTitle from './PhaseTitle';
import LoadingSpinner from '../../LoadingSpinner';
import injectFirebaseData from '../../InjectFirebaseData';

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
    if (loading) return <LoadingSpinner />
    return (
      <div>
        <PhaseTitle
          title={data.name}
          collapsed={this.state.collapsed}
          onCollapseToggle={this.onCollapseToggle}
        />
        {!this.state.collapsed &&
          <p>{JSON.stringify(data.activities)}</p>
        }
      </div>
    );
  };
}

const getRef = props => firebase.database().ref(`phases/${props.phaseKey}`);

export default injectFirebaseData(Phase, getRef);
