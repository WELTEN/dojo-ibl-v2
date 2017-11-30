import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import Comment from '../Comment';

const Container = glamorous.section({
  whiteSpace: 'initial'
});

const getCommentList = (activity, group) =>
  Object.keys(((group.activities || {})[activity.key] || {}).comments || {});

const CommentList = ({ activity, group }) => (
  <Container>
    {getCommentList(activity, group).reverse().map((comment) =>
      <Comment
        activity={activity}
        group={group}
        commentKey={comment}
        key={comment}
      />
    )}
  </Container>
);

CommentList.propTypes = {
  activity: PropTypes.shape({
    key: PropTypes.string.isRequired
  }).isRequired,
  group: PropTypes.shape({
    activities: PropTypes.shape({
      comments: PropTypes.object
    })
  }).isRequired
};

export default CommentList;
