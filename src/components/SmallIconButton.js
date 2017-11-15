import React from 'react';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';

const Button = glamorous(IconButton)({
  padding: '6px !important',
  width: '36px !important',
  height: '36px !important'
});

const SmallIconButton = ({ children, iconStyle, ...props }) => (
  <Button
    {...props}
    iconStyle={{ width: 18, height: 18, ...iconStyle }}
  >
    {children}
  </Button>
);

export default SmallIconButton;
