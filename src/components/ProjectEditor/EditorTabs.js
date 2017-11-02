import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import { grey300 } from 'material-ui/styles/colors';
import { accentColor } from '../../styles';

export default class EditorTabs extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired
  };

  state = { currentTab: 'info' };

  handleChange = value => this.setState({ currentTab: value });

  render = () => {
    const tabStyle = { backgroundColor: grey300, color: accentColor };
    return (
      <Tabs
        value={this.state.currentTab}
        onChange={this.handleChange}
      >
        <Tab label="Info" value="info" style={tabStyle}>
          <h1>Info</h1>
        </Tab>
        <Tab label="Structure" value="structure" style={tabStyle}>
          <h1>Structure</h1>
        </Tab>
        <Tab label="Groups" value="groups" style={tabStyle}>
          <h1>Groups</h1>
        </Tab>
      </Tabs>
    );
  };
}
