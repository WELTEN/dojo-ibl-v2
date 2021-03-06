import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { grey400, grey600 } from 'material-ui/styles/colors';
import GroupUsers from './GroupUsers';
import TitleDateBlock from './TitleDateBlock';
import Aux from 'react-aux';
import { ContentBlock } from './ListItem'

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
      {actions ? actions(group) : null}
    </ContentBlock>
  </Aux>
);

GroupListItem.propTypes = {
  group: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    creationDate: PropTypes.number.isRequired
  }).isRequired,
  actions: PropTypes.func,
  title: PropTypes.any
};

export default GroupListItem;
