import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import { connect } from 'react-redux';
import { transition } from '../../../styles';

const Activity = glamorous.section({
  float: 'left',
  marginTop: 14,
  paddingLeft: 48,
  width: '75%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  opacity: 1,
  whiteSpace: 'nowrap',
  transition
}, ({ open }) => {
  if (!open) return { paddingLeft: 0, width: 0, opacity: 0 };
});

const CollapsibleActivity = ({ open, openActivity, group, onClose }) => (
  <Activity open={open}>
    is open: {open.toString()}, showing activity: {openActivity}
    <IconButton onClick={onClose}>
      <Close />
    </IconButton>
  </Activity>
);

CollapsibleActivity.propTypes = {
  open: PropTypes.bool,
  openActivity: PropTypes.string,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    dispatch({ type: 'CLOSE', activity: '' });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CollapsibleActivity
);
