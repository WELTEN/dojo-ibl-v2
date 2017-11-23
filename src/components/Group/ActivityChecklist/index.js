import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import AddItem from './AddItem';
import Items from './Items';

const Checklist = glamorous.section({
  marginBottom: 24,
  whiteSpace: 'normal'
});

const ActivityChecklist = ({ checklist }) => (
  <Checklist>
    <AddItem checklist={checklist} />
    <Items checklist={checklist} />
  </Checklist>
);

ActivityChecklist.propTypes = {
  checklist: PropTypes.string.isRequired
};

export default ActivityChecklist;
