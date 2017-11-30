import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import CircularProgress from 'material-ui/CircularProgress';

const SpinnerContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'center'
});

const LoadingSpinner = ({ css }) => (
  <SpinnerContainer css={css}>
    <CircularProgress />
  </SpinnerContainer>
);

LoadingSpinner.propTypes = {
  css: PropTypes.object
};

export default LoadingSpinner;
