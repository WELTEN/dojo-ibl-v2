import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { blue500 } from 'material-ui/styles/colors';
import { Link as RouterLink } from 'react-router-dom';

const linkStyles = {
  color: blue500,
  textDecoration: 'none'
};

const StyledA = glamorous.a(linkStyles);
const StyledLink = glamorous(RouterLink)(linkStyles);

const Link = ({ to, children }) => {
  if (to.startsWith('http://') || to.startsWith('https://')) {
    return <StyledA href={to}>{children}</StyledA>;
  } else {
    return <StyledLink to={to}>{children}</StyledLink>
  }
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
};

export default Link;
