import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const ButtonContainer = glamorous.footer({ marginTop: 24 });
const PrevButton = glamorous(FlatButton)({ marginRight: '12px !important' });

const StepButtons = ({ onPrev, onNext, last }) => (
  <ButtonContainer>
    <PrevButton
      label="Back"
      disabled={!onPrev}
      onClick={onPrev}
    />
    <RaisedButton
      label={last ? 'Finish' : 'Next'}
      primary
      onClick={onNext}
    />
  </ButtonContainer>
);

StepButtons.propTypes = {
  onPrev: PropTypes.func,
  onNext: PropTypes.func.isRequired,
  last: PropTypes.bool
};

export default StepButtons;
