import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Phase from './Phase';
import AddPhase from './AddPhase';

const OverflowFix = glamorous.div({
  marginBottom: -12,
  marginLeft: -6,
  marginRight: -6,
  paddingLeft: 6,
  paddingRight: 6,
  paddingBottom: 12,
  overflow: 'hidden'
});

const PhaseContainer = glamorous.section({
  marginLeft: -12,
  marginRight: -12,
  display: 'flex',
  flexWrap: 'wrap'
});

const Structure = ({ project }) => {
  const phases = project.phases || {};

  const sortedPhaseKeys = Object.keys(phases).sort(
    (a, b) => phases[a] - phases[b]
  );

  const sortedPhases = Object.entries(phases).sort(
    (a, b) => a[1] - b[1]
  );

  return (
    <OverflowFix>
      <PhaseContainer>
        {sortedPhases.map(([ key, phaseIndex ], index) =>
          <Phase
            phaseKey={key}
            previousPhase={sortedPhaseKeys[index - 1]}
            nextPhase={sortedPhaseKeys[index + 1]}
            index={phaseIndex}
            sortedPhaseKeys={sortedPhaseKeys}
            phases={phases}
            projectKey={project.key}
            key={key}
          />
        )}
        <AddPhase
          projectKey={project.key}
          lastIndex={sortedPhases[sortedPhases.length - 1][1]}
        />
      </PhaseContainer>
    </OverflowFix>
  );
};

Structure.propTypes = {
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
    phases: PropTypes.object
  }).isRequired
};

export default Structure;
