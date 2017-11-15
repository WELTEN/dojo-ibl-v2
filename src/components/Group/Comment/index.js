import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import FormattedText from '../../FormattedText';
import injectFirebaseData from '../../InjectFirebaseData';
import * as firebase from 'firebase';
import WithUserInfo from './WithUserInfo';

const CommentText = glamorous(FormattedText)({
  minWidth: 'calc(75vw - 240px)'
});

const Comment = ({ loading, data, activity }) => (
  <WithLoadingSpinner loading={loading}>
    <WithUserInfo comment={data}>
      <CommentText>
        {data.comment}
      </CommentText>
    </WithUserInfo>
  </WithLoadingSpinner>
);

Comment.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  activity: PropTypes.object.isRequired,
  commentKey: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`comments/${props.commentKey}`);

export default injectFirebaseData(Comment, getRef, true);
