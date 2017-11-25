import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import { grey300 } from 'material-ui/styles/colors';
import { accentColor } from '../../styles';
import Info from './Info';
import Structure from './Structure';
import Groups from './Groups';
import Editors from './Editors';

export default class EditorTabs extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired
  };

  state = { currentTab: 'info' };

  handleChange = value => this.setState({ currentTab: value });

  render = () => {
    const project = this.props.project;

    const tabStyle = {
      color: accentColor,
      backgroundColor: grey300,
      borderRadius: 0
    };

    return (
      <Tabs
        style={{ marginLeft: -14, marginRight: -14 }}
        value={this.state.currentTab}
        onChange={this.handleChange}
      >
        <Tab label="Info" value="info" style={tabStyle}>
          <Info project={project} />
        </Tab>
        <Tab label="Structure" value="structure" style={tabStyle}>
          <Structure project={project} />
        </Tab>
        <Tab label="Groups" value="groups" style={tabStyle}>
          <Groups project={project} />
        </Tab>
        <Tab label="Editors" value="editors" style={tabStyle}>
          <Editors project={project} />
        </Tab>
      </Tabs>
    );
  };
}
