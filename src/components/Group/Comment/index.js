import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import FormattedText from '../../FormattedText';
import injectFirebaseData from '../../InjectFirebaseData';
import * as firebase from 'firebase';
import WithUserInfo from './WithUserInfo';
import CommentActions from './CommentActions';

const CommentText = glamorous(FormattedText)({
  minWidth: 'calc(75vw - 240px)'
});

const Comment = ({ loading, data, activity, group }) => (
  <WithLoadingSpinner loading={loading}>
    <WithUserInfo
      comment={data}
      commentActions={() => (
        <CommentActions
          comment={data}
          activity={activity}
          group={group}
        />
      )}
    >
      <CommentText>
        {(data.comment || '').trim()}
      </CommentText>
    </WithUserInfo>
  </WithLoadingSpinner>
);

Comment.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  activity: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  commentKey: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`comments/${props.commentKey}`);

export default injectFirebaseData(Comment, getRef, true);
