import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import TemplatePhase from './TemplatePhase';

const PhaseContainer = glamorous.div({
  margin: -4,
  display: 'flex',
  flexWrap: 'wrap'
});

const TemplatePhases = ({ phases }) => (
  <PhaseContainer>
    {phases.map(phase => <TemplatePhase key={phase.key} name={phase.name} />)}
  </PhaseContainer>
);

TemplatePhases.propTypes = {
  phases: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TemplatePhases;
