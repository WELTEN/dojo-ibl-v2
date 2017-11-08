import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import LoadingSpinner from '../../LoadingSpinner';
import GroupUsers from './GroupUsers';
import GroupActions from './GroupActions';
import * as firebase from 'firebase';
import { grey400, grey600 } from 'material-ui/styles/colors';
import TitleDateBlock from '../../TitleDateBlock';
import ListItem from '../../ListItem';

const Item = glamorous(ListItem)({
  ':first-child': {
    marginTop: 24
  }
});

const ContentBlock = glamorous.section({
  display: 'inline-flex',
  alignItems: 'center'
});

const Code = glamorous.div({
  marginRight: 24,
  width: 72,
  color: grey600
});

const Hashtag = glamorous.span({ color: grey400 });

export default class Group extends Component {
  static propTypes = {
    groupKey: PropTypes.string.isRequired,
    projectKey: PropTypes.string.isRequired
  };

  state = {
    loading: true,
    group: {}
  };

  getRef = () => firebase.database().ref(`groups/${this.props.groupKey}`);

  componentDidMount = () => {
    this.getRef().on('value', (snapshot) => {
      const group = snapshot.val();
      group.key = this.props.groupKey;
      this.setState({
        loading: false,
        group
      });
    });
  };

  componentWillUnmount = () => this.getRef().off();

  render = () => {
    if (this.state.loading) return <LoadingSpinner />;

    return (
      <Item>
        <ContentBlock>
          <Code>
            <Hashtag>#</Hashtag>
            {this.state.group.code}
          </Code>
          <TitleDateBlock
            title={this.state.group.name}
            date={this.state.group.creationDate}
          />
        </ContentBlock>
        <ContentBlock>
          <GroupUsers group={this.state.group} />
          <GroupActions group={this.state.group} />
        </ContentBlock>
      </Item>
    );
  };
}
