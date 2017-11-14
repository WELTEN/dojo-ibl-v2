import React from 'react';
import PropTypes from 'prop-types';
import FormattedText from '../FormattedText';

const GroupDescription = ({ group }) => {
  if (group.description) {
    return <FormattedText>{group.description}</FormattedText>;
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
