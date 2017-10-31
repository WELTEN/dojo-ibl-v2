import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { blue500, blue900 } from 'material-ui/styles/colors';
import { Link as RouterLink } from 'react-router-dom';

const linkStyles = {
  color: blue500,
  textDecoration: 'none',
  cursor: 'pointer',
  ':hover': {
    color: blue900
  }
};

const StyledA = glamorous.a(linkStyles);
const StyledLink = glamorous(RouterLink)(linkStyles);

const Link = ({ to, onClick, children }) => {
  if (onClick) {
    return <StyledA onClick={onClick}>{children}</StyledA>;
  }

  if (to.startsWith('http://') || to.startsWith('https://')) {
    return <StyledA href={to}>{children}</StyledA>;
  } else {
    return <StyledLink to={to}>{children}</StyledLink>
  }
};

Link.defaultProps = {
  to: ''
};

Link.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func
};

export default Link;
