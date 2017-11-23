import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import FormattedText from '../../FormattedText';
import { ellipsis } from '../../../styles';
import Aux from 'react-aux';
import { NORMAL, INPUT, CHECKLIST, MULTI } from '../../../lib/activityTypes';
import ActivityInput from './ActivityInput';
import ActivityChecklist from '../ActivityChecklist';

const Name = glamorous.h2(ellipsis, {
  marginTop: 0,
  marginBottom: 18,
  maxWidth: 'calc(100% - 36px)',
  lineHeight: '48px',
  ':last-child': {
    marginBottom: 12
  }
});

const Description = glamorous(FormattedText)({
  marginBottom: 12,
  minWidth: 'calc(75vw - 240px)'
});

const ActivityContent = ({ activity }) => (
  <Aux>
    <Name>{activity.name}</Name>
    {activity.description &&
      <Description>{activity.description}</Description>
    }
    {activity.type === INPUT &&
      <ActivityInput input={activity.input} />
    }
    {activity.type === CHECKLIST &&
      <ActivityChecklist checklist={activity.checklist} />
    }
  </Aux>
);

ActivityContent.propTypes = {
  activity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.oneOf([NORMAL, INPUT, CHECKLIST, MULTI]).isRequired,
    input: PropTypes.string,
    checklist: PropTypes.string
  }).isRequired
};

export default ActivityContent;