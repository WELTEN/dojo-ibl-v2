import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import CircularProgress from 'material-ui/CircularProgress';

const SpinnerContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'center'
});

const WithLoadingSpinner = ({ loading, children }) => {
  if (loading) {
    return (
      <SpinnerContainer>
        <CircularProgress />
      </SpinnerContainer>
    );
  } else {
    return children;
  }
};

WithLoadingSpinner.propTypes = {
  loading: PropTypes.bool
};

export default WithLoadingSpinner;
