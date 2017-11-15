import React from 'react';
import PropTypes from 'prop-types';
import Aux from 'react-aux';
import CommentForm from './CommentForm';

const ActivityComments = ({ activity, group }) => (
  <Aux>
    <CommentForm activity={activity} group={group} />
    <div>*comment list*</div>
  </Aux>
);

ActivityComments.propTypes = {
  activity: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired
};

export default ActivityComments;
