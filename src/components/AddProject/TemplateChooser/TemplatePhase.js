import React from 'react';
import PropTypes from 'prop-types';

const TemplatePhase = ({ name }) => (
  <div>{name}</div>
);

TemplatePhase.propTypes = {
  name: PropTypes.string.isRequired
};

export default TemplatePhase;
