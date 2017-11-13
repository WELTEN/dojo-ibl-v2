import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const TitleContainer = glamorous.header({
  marginTop: 0,
  marginBottom: 12
});

const Title = glamorous.h3({ margin: 0 });

const PhaseTitle = ({ title, collapsed, onCollapseToggle }) => (
  <TitleContainer onClick={onCollapseToggle}>
    <Title>{title}</Title>
  </TitleContainer>
);

PhaseTitle.propTypes = {
  title: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onCollapseToggle: PropTypes.func.isRequired
};

export default PhaseTitle;
