import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import FlatButton from 'material-ui/FlatButton';
import Aux from 'react-aux';
import { ButtonContainer, PrevButton } from './StepButtons';
import Link from '../Link';

const Title = glamorous.h2({
  marginTop: 0,
  marginBottom: 12
});

const Text = glamorous.p({ margin: 0 });

const Done = ({ onPrev, projectKey }) => (
  <Aux>
    <Title>{`You're all set!`}</Title>
    <Text>The project was successfully created.</Text>
    <ButtonContainer>
      <PrevButton
        label="Back"
        onClick={onPrev}
      />
      <Link to="/projects">
        <FlatButton
          label="Go to project overview"
          primary
        />
      </Link>
    </ButtonContainer>
  </Aux>
);

Done.propTypes = {
  onPrev: PropTypes.func.isRequired,
  projectKey: PropTypes.string.isRequired
};

export default Done;
