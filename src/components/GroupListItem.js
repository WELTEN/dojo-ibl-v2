import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { grey400, grey600 } from 'material-ui/styles/colors';
import GroupUsers from './GroupUsers';
import TitleDateBlock from './TitleDateBlock';
import Aux from 'react-aux';

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

const GroupListItem = ({ group, actions, title }) => (
  <Aux>
    <ContentBlock>
      <Code>
        <Hashtag>#</Hashtag>
        {group.code}
      </Code>
      <TitleDateBlock
        title={title ? title : group.name}
        date={group.creationDate}
      />
    </ContentBlock>
    <ContentBlock>
      <GroupUsers group={group} />
      {actions(group)}
    </ContentBlock>
  </Aux>
);

GroupListItem.propTypes = {
  group: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    creationDate: PropTypes.number.isRequired
  }).isRequired,
  actions: PropTypes.func.isRequired,
  title: PropTypes.any
};

export default GroupListItem;
