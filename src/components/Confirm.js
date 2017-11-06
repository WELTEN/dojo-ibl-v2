import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const actions = (onCancel, onOk) => [
  <FlatButton
    label="Cancel"
    onClick={onCancel}
  />,
  <FlatButton
    label="Ok"
    primary
    onClick={onOk}
  />
];

const Confirm = ({ title, msg, open, onOk, onCancel }) => (
  <Dialog
    title={title}
    actions={actions(onCancel, onOk)}
    modal={false}
    open={open}
    onRequestClose={onCancel}
  >
    {msg}
  </Dialog>
);

Confirm.propTypes = {
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default Confirm;
