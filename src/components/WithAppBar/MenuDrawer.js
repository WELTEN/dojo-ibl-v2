import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Folder from 'material-ui/svg-icons/file/folder';
import Group from 'material-ui/svg-icons/social/group';
import Link from '../Link';
import DrawerHeader from './DrawerHeader';

const MenuLink = glamorous(Link)({
  color: 'inherit',
  ':hover': {
    color: 'inherit'
  }
});

const MenuDrawer = ({ open, onChange }) => (
  <Drawer
    docked={false}
    open={open}
    onRequestChange={onChange}
  >
    <DrawerHeader />
    <MenuLink to="/">
      <MenuItem
        primaryText="Groups"
        leftIcon={<Group />}
        onClick={() => onChange(false)}
      />
    </MenuLink>
    <MenuLink to="/projects">
      <MenuItem
        primaryText="Projects"
        leftIcon={<Folder />}
        onClick={() => onChange(false)}
      />
    </MenuLink>
  </Drawer>
);

MenuDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MenuDrawer;
