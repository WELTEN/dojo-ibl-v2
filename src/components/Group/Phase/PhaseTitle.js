import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import { ellipsis } from '../../../styles';
import Chip from 'material-ui/Chip';

const TitleContainer = glamorous.header({
  marginTop: 0,
  marginBottom: 2,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
});

const Title = glamorous.h3(ellipsis, { margin: 0 });

const CustomIconButton = ({ collapsed, children, ...props }) => (
  <IconButton {...props}>{children}</IconButton>
);

const CollapseArrow = glamorous(CustomIconButton)(({ collapsed }) => {
  if (collapsed) return { transform: 'rotate(-90deg)' };
});

const NoActivities = glamorous(Chip)({ marginLeft: '20px !important' });

const PhaseTitle = ({ title, collapsed, onCollapseToggle, activityCount }) => (
  <TitleContainer onClick={onCollapseToggle}>
    <Title>{title}</Title>
    {activityCount > 0 &&
      <CollapseArrow collapsed={collapsed}>
        <KeyboardArrowDown />
      </CollapseArrow>
    }
    {activityCount === 0 &&
      <NoActivities>No activities</NoActivities>
    }
  </TitleContainer>
);

PhaseTitle.propTypes = {
  title: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onCollapseToggle: PropTypes.func.isRequired,
  activityCount: PropTypes.number.isRequired
};

export default PhaseTitle;
