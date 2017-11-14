import React from 'react';
import PropTypes from 'prop-types';
import { Item, Title, Description } from '../../StyledActivity';

const Activity = ({ activity }) => (
  <Item>
    <Title>{activity.name}</Title>
    {activity.description &&
      <Description>
        {activity.description}
      </Description>
    }
  </Item>
);

Activity.propTypes = {
  activity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired
};

export default Activity;
