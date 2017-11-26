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
}, ({ childActivity }) => {
  if (childActivity) return {
    marginBottom: 12,
    fontSize: 24,
    lineHeight: '38px'
  };
});

const Description = glamorous(FormattedText)({
  marginBottom: 12,
  minWidth: 'calc(75vw - 240px)'
});

const ActivityContent = ({ activity, childActivity }) => (
  <Aux>
    <Name childActivity={childActivity}>{activity.name}</Name>
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

ActivityContent.defaultProps = {
  childActivity: false
};

ActivityContent.propTypes = {
  activity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.oneOf([NORMAL, INPUT, CHECKLIST, MULTI]),
    input: PropTypes.string,
    checklist: PropTypes.string
  }).isRequired,
  childActivity: PropTypes.bool
};

export default ActivityContent;
