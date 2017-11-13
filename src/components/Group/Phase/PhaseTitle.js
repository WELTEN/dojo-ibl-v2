import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

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

const CollapseArrow = glamorous(CustomIconButton)({

}, ({ collapsed }) => {
  if (collapsed) return { transform: 'rotate(-90deg)' };
});

const PhaseTitle = ({ title, collapsed, onCollapseToggle }) => (
  <TitleContainer onClick={onCollapseToggle}>
    <Title>{title}</Title>
    <CollapseArrow collapsed={collapsed}>
      <KeyboardArrowDown />
    </CollapseArrow>
  </TitleContainer>
);

PhaseTitle.propTypes = {
  title: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onCollapseToggle: PropTypes.func.isRequired
};

export default PhaseTitle;
