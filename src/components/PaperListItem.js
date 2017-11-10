import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Paper from 'material-ui/Paper';
import ListItem from './ListItem';
import WithLoadingSpinner from './WithLoadingSpinner';

const ItemPaper = glamorous(Paper)({
  marginBottom: 12,
  padding: 12,
  ':last-of-type': {
    marginBottom: '80px !important'
  }
}, ({ onClick }) => {
  if (onClick) return { cursor: 'pointer' };
});

const Item = glamorous(ListItem)({ marginBottom: 0 });

const PaperListItem = ({ loading, onClick, children }) => (
  <ItemPaper onClick={onClick}>
    <WithLoadingSpinner loading={loading}>
      <Item>
        {children}
      </Item>
    </WithLoadingSpinner>
  </ItemPaper>
);

PaperListItem.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default PaperListItem;
