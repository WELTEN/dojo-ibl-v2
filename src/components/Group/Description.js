import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import FormattedText from '../FormattedText';

const GroupDescription = glamorous(FormattedText)({ marginBottom: 24 });

const Description = ({ group }) => {
  if (group.description) {
    return (
      <GroupDescription>
        {group.description}
      </GroupDescription>
    );
  } else {
    return null;
  }
}

Description.propTypes = {
  group: PropTypes.shape({
    description: PropTypes.string
  }).isRequired
};

export default Description;
