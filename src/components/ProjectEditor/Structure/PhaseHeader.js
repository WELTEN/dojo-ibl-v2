import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Close from 'material-ui/svg-icons/navigation/close';
import { red500 } from 'material-ui/styles/colors';

const Header = glamorous.header({
  marginTop: -10,
  marginBottom: 2,
  display: 'flex',
  alignItems: 'center'
});

const Title = glamorous.h3({
  margin: 0,
  maxWidth: 'calc(100% - 96px)',
  fontSize: 20,
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

const PhaseHeader = ({
  phase,
  onEdit,
  onDelete,
  connectDragSource
}) => connectDragSource(
  <div>
    <Header>
      <Title>{phase.name}</Title>
      <IconButton onClick={onEdit}>
        <Edit />
      </IconButton>
      <IconButton iconStyle={{ color: red500 }} onClick={onDelete}>
        <Close />
      </IconButton>
    </Header>
  </div>
);

PhaseHeader.propTypes = {
  phase: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default PhaseHeader;
