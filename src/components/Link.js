import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { blue500, blue900 } from 'material-ui/styles/colors';
import { Link as RouterLink } from 'react-router-dom';

const removeUnstyledProp = (props) => {
  const newProps = Object.assign({}, props);
  newProps.unstyled = undefined;
  return newProps;
};

// Prevent passing on the unstyled prop
const CustomA = (props) =>
  <a {...removeUnstyledProp(props)}>{props.children}</a>;

// Prevent passing on the unstyled prop
const CustomRouterLink = (props) =>
  <RouterLink {...removeUnstyledProp(props)}>{props.children}</RouterLink>;

const linkStyles = {
  color: blue500,
  textDecoration: 'none',
  cursor: 'pointer',
  ':hover': {
    color: blue900
  }
};

const unstyledHandler = ({ unstyled }) => {
  if (unstyled) return {
    color: 'inherit',
    textDecoration: 'inherit',
    ':hover': {
      color: 'inherit'
    }
  };
};

const StyledA = glamorous(CustomA)(linkStyles, unstyledHandler);
const StyledLink = glamorous(CustomRouterLink)(linkStyles, unstyledHandler);

const Link = ({ to, onClick, children, unstyled, ...props }) => {
  if (onClick) {
    return (
      <StyledA onClick={onClick} unstyled={unstyled} {...props}>
        {children}
      </StyledA>
    );
  }

  if (to.startsWith('http://') || to.startsWith('https://')) {
    return (
      <StyledA href={to} unstyled={unstyled} {...props}>
        {children}
      </StyledA>
    );
  } else {
    return (
      <StyledLink to={to} unstyled={unstyled} {...props}>
        {children}
      </StyledLink>
    );
  }
};

Link.defaultProps = {
  to: ''
};

Link.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  unstyled: PropTypes.bool
};

export default Link;
