import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Paper from 'material-ui/Paper';
import ListItem from './ListItem';
import LoadingSpinner from './LoadingSpinner';

const ItemPaper = glamorous(Paper)({
  marginBottom: 12,
  padding: 12,
  ':last-of-type': {
    marginBottom: '80px !important'
  }
});

const Item = glamorous(ListItem)({ marginBottom: 0 });

const PaperListItem = ({ loading, children }) => (
  <ItemPaper>
    {loading ? (
      <LoadingSpinner />
    ) : (
      <Item>
        {children}
      </Item>
    )}
  </ItemPaper>
);

PaperListItem.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default PaperListItem;
