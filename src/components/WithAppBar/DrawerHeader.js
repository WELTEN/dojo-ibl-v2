import React from 'react';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import Avatar from 'material-ui/Avatar';
import { white } from 'material-ui/styles/colors';
import DrawerHeaderBackground from './DrawerHeaderBackground.png';
import DefaultPhoto from './DefaultPhoto.png';

const Header = glamorous.header({
  position: 'relative',
  padding: 16,
  color: white
});

const Background = glamorous.img({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1
});

const Content = glamorous.div({
  display: 'flex',
  alignItems: 'center'
});

const Name = glamorous.span({
  marginLeft: 12
});

const DrawerHeader = () => {
  const { displayName, photoURL } = firebase.auth().currentUser;
  return (
    <Header>
      <Background
        src={DrawerHeaderBackground}
        alt="Drawer header background"
      />
      <Content>
        <Avatar size={44} src={photoURL || DefaultPhoto} />
        <Name>{displayName}</Name>
      </Content>
    </Header>
  );
};

export default DrawerHeader;
