import React from 'react';
import PropTypes from 'prop-types';
import Phases from './Phases';
import CollapsibleActivity from './CollapsibleActivity';

const Content = ({ group }) => (
  <div>
    <Phases group={group} />
    <CollapsibleActivity group={group} />
  </div>
);

Content.propTypes = {
  group: PropTypes.object.isRequired
};

export default Content;
