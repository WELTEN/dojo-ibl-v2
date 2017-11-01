import React from 'react';
import PropTypes from 'prop-types';
import TemplatePhase from './TemplatePhase';

const TemplatePhases = ({ phases }) => (
  <div>
    <h4>Phases</h4>
    {phases.map((phase) =>
      <TemplatePhase
        key={phase.key}
        name={phase.name}
      />
    )}
  </div>
);

TemplatePhases.propTypes = {
  phases: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TemplatePhases;
