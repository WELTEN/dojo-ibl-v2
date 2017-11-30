import React from 'react';
import PropTypes from 'prop-types';
import Aux from 'react-aux';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const ActivityComments = ({ activity, group }) => (
  <Aux>
    <CommentForm activity={activity} group={group} />
    <CommentList activity={activity} group={group} />
  </Aux>
);

ActivityComments.propTypes = {
  activity: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired
};

export default ActivityComments;
