import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import FormattedText from '../FormattedText';

const Description = glamorous(FormattedText)({ marginBottom: 24 });

const GroupDescription = ({ group }) => {
  if (group.description) {
    return <Description>{group.description}</Description>;
  } else {
    return null;
  }
}

GroupDescription.propTypes = {
  group: PropTypes.shape({
    description: PropTypes.string
  }).isRequired
};

export default GroupDescription;
