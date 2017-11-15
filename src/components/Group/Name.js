import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import PageTitle from '../PageTitle';
import { grey300, grey400 } from 'material-ui/styles/colors';

const Code = glamorous.span({
  marginLeft: 12,
  color: grey400
});

const Hashtag = glamorous.span({ color: grey300 });

const Name = ({ group }) => (
  <PageTitle>
    {group.name}
    <Code>
      <Hashtag>#</Hashtag>
      {group.code}
    </Code>
  </PageTitle>
);

Name.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  }).isRequired
};

export default Name;
