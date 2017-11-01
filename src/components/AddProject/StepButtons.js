import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const ButtonContainer = glamorous.footer({ marginTop: 24 });
const PrevButton = glamorous(FlatButton)({ marginRight: '12px !important' });

const StepButtons = ({ onPrev, onNext, prevDisabled, last }) => (
  <ButtonContainer>
    <PrevButton
      label="Back"
      disabled={prevDisabled}
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
  prevDisabled: PropTypes.bool,
  last: PropTypes.bool
};

export default StepButtons;
