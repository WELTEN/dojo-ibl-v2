import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import { grey300 } from 'material-ui/styles/colors';

const TitleContainer = glamorous.header({
  marginTop: 0,
  marginBottom: 2,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
});

const Title = glamorous.h3({ margin: 0 });

const CustomIconButton = ({ collapsed, children, ...props }) => (
  <IconButton {...props}>{children}</IconButton>
);

const CollapseArrow = glamorous(CustomIconButton)(({ collapsed }) => {
  if (collapsed) return { transform: 'rotate(-90deg)' };
});

const NoActivities = glamorous.h4({
  margin: 0,
  marginLeft: 20,
  padding: '8px 12px',
  backgroundColor: grey300,
  borderRadius: 16
});

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
