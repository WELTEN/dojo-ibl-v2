import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Checkbox from 'material-ui/Checkbox';
import SmallIconButton from '../../SmallIconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import { grey600, red500 } from 'material-ui/styles/colors';
import Confirm from '../../Confirm';
import * as firebase from 'firebase';
import { transition } from '../../../styles';

const StyledItem = glamorous.div({
  display: 'flex',
  alignItems: 'center'
});

const ItemCheckbox = glamorous(Checkbox)({
  width: 'auto !important',
  flex: 1
});

const ItemLabel = glamorous.span({ transition }, ({ checked }) => {
  if (checked) return {
    color: grey600,
    textDecoration: 'line-through'
  };
});

const CloseButton = glamorous(SmallIconButton)({
  marginTop: '-6px !important',
  marginBottom: '-6px !important'
});

export default class Item extends Component {
  static propTypes = {
    itemKey: PropTypes.string.isRequired,
    item: PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    checklist: PropTypes.string.isRequired
  };

  state = { deleting: false };

  handleCheck = (e) => {
    const { itemKey, checklist } = this.props;
    firebase.database().ref(`checklists/${checklist}/items/${itemKey}/checked`).set(e.target.checked);
  };

  onDelete = () => this.setState({ deleting: true });

  onDeleteConfirm = () => {
    const { itemKey, checklist } = this.props;
    firebase.database().ref(`checklists/${checklist}/items/${itemKey}`).remove();
  };

  onDeleteCancel = () => this.setState({ deleting: false });

  render = () => (
    <StyledItem>
      <ItemCheckbox
        checked={this.props.item.checked}
        onCheck={this.handleCheck}
        label={
          <ItemLabel checked={this.props.item.checked}>
            {this.props.item.name}
          </ItemLabel>
        }
      />
      <CloseButton iconStyle={{ color: red500 }} onClick={this.onDelete}>
        <Close />
      </CloseButton>
      <Confirm
        title="Confirm item deletion"
        msg="After you delete an item, there's no way back!"
        open={this.state.deleting}
        onOk={this.onDeleteConfirm}
        onCancel={this.onDeleteCancel}
      />
    </StyledItem>
  );
}
