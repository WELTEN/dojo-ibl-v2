import React from 'react';
import PropTypes from 'prop-types';
import Aux from 'react-aux';
import StepButtons from './StepButtons';

const CustomizeProject = ({ onPrev, onNext, projectKey }) => (
  <Aux>
    <StepButtons
      onPrev={onPrev}
      onNext={onNext}
      last
    />
  </Aux>
);

CustomizeProject.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  projectKey: PropTypes.string.isRequired
};

export default CustomizeProject;
