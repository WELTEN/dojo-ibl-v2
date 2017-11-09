import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import LoadingSpinner from '../../LoadingSpinner';
import GroupUsers from './GroupUsers';
import GroupActions from './GroupActions';
import * as firebase from 'firebase';
import { grey400, grey600 } from 'material-ui/styles/colors';
import TitleDateBlock from '../../TitleDateBlock';
import ListItem from '../../ListItem';
import injectFirebaseData from '../../InjectFirebaseData';

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

const Group = ({ loading, data }) => {
  if (loading) return <LoadingSpinner />;
  return (
    <Item>
      <ContentBlock>
        <Code>
          <Hashtag>#</Hashtag>
          {data.code}
        </Code>
        <TitleDateBlock
          title={data.name}
          date={data.creationDate}
        />
      </ContentBlock>
      <ContentBlock>
        <GroupUsers group={data} />
        <GroupActions group={data} />
      </ContentBlock>
    </Item>
  );
};

Group.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  groupKey: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`groups/${props.groupKey}`);

export default injectFirebaseData(Group, getRef, true);
