import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import LoadingSpinner from '../../LoadingSpinner';
import GroupUsers from './GroupUsers';
import GroupActions from './GroupActions';
import * as firebase from 'firebase';
import { black, grey400, grey600 } from 'material-ui/styles/colors';
import moment from 'moment';

const Item = glamorous.article({
  marginBottom: 6,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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

const Info = glamorous.div({ width: 240 });

const Name = glamorous.h4({
  marginTop: 0,
  marginBottom: 4,
  width: '100%',
  color: black,
  fontSize: 16,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap'
});

const CreationDate = glamorous.div({
  color: grey600,
  fontSize: 14
});

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
          <Info>
            <Name>{this.state.group.name}</Name>
            <CreationDate>
              {moment(this.state.group.creationDate).calendar()}
            </CreationDate>
          </Info>
        </ContentBlock>
        <ContentBlock>
          <GroupUsers group={this.state.group} />
          <GroupActions group={this.state.group} />
        </ContentBlock>
      </Item>
    );
  };
}
