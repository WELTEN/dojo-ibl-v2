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

const Structure = ({ project }) => (
  <OverflowFix>
    <PhaseContainer>
      {Object.keys(project.phases || {}).map((phase) =>
        <Phase
          phaseKey={phase}
          projectKey={project.key}
          key={phase}
        />
      )}
      <AddPhase projectKey={project.key} />
    </PhaseContainer>
  </OverflowFix>
);

Structure.propTypes = {
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
    phases: PropTypes.object
  }).isRequired
};

export default Structure;
