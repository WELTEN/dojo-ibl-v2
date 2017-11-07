import React from 'react';
import glamorous from 'glamorous';
import CircularProgress from 'material-ui/CircularProgress';

const SpinnerContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'center'
});

const LoadingSpinner = () => (
  <SpinnerContainer>
    <CircularProgress />
  </SpinnerContainer>
);

export default LoadingSpinner;
