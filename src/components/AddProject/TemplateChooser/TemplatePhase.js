import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Chip from 'material-ui/Chip';

const StyledChip = glamorous(Chip)({
  margin: '4px !important'
});

const TemplatePhase = ({ name }) => (
  <StyledChip>{name}</StyledChip>
);

TemplatePhase.propTypes = {
  name: PropTypes.string.isRequired
};

export default TemplatePhase;
