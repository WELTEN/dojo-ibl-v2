import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const WithLoadingSpinner = ({ loading, children }) => {
  if (loading) {
    return <LoadingSpinner />;
  } else {
    return children;
  }
};

WithLoadingSpinner.propTypes = {
  loading: PropTypes.bool
};

export default WithLoadingSpinner;
