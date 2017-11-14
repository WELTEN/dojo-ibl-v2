import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import { grey300, grey400 } from 'material-ui/styles/colors';
import PageTitle from '../components/PageTitle';
import FormattedText from '../components/FormattedText';
import GroupPhases from '../components/Group/GroupPhases';
import WithLoadingSpinner from '../components/WithLoadingSpinner';
import injectFirebaseData from '../components/InjectFirebaseData';

const Code = glamorous.span({
  marginLeft: 12,
  color: grey400
});

const Hashtag = glamorous.span({ color: grey300 });

const Group = ({ loading, data }) => (
  <WithLoadingSpinner loading={loading}>
    <PageTitle>
      {data.name}
      <Code>
        <Hashtag>#</Hashtag>
        {data.code}
      </Code>
    </PageTitle>
    {data.description &&
      <FormattedText>
        {data.description}
      </FormattedText>
    }
    <GroupPhases group={data} />
  </WithLoadingSpinner>
);

Group.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      groupKey: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const getRef = props => firebase.database().ref(`groups/${props.match.params.groupKey}`);

export default injectFirebaseData(Group, getRef, true);
