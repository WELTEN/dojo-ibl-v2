import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import DefaultProfilePicture from '../../DefaultProfilePicture.png';
import WithLoadingSpinner from '../../WithLoadingSpinner';
import Avatar from 'material-ui/Avatar';
import injectFirebaseData from '../../InjectFirebaseData';
import * as firebase from 'firebase';
import moment from 'moment';
import { black } from 'material-ui/styles/colors';

export const CommentContainer = glamorous.section({
  marginBottom: 6,
  display: 'flex',
  whiteSpace: 'initial'
});

export const ProfilePicture = glamorous(Avatar)({
  marginRight: 12,
  minWidth: 40
});

export const Content = glamorous.div({ flex: 1 });

const CommentMeta = glamorous.h4({
  marginTop: -6,
  marginBottom: -6,
  display: 'flex',
  alignItems: 'center'
});

const Name = glamorous.span({
  marginRight: 8,
  color: black,
  fontWeight: 500
});

const WithUserInfo = ({
  loading,
  data,
  comment,
  commentActions,
  children
}) => (
  <WithLoadingSpinner loading={loading}>
    <CommentContainer>
      <ProfilePicture src={data.photoURL || DefaultProfilePicture} />
      <Content>
        <CommentMeta>
          <Name>{data.displayName}</Name>
          {moment(data.creationDate).calendar()}
          {commentActions()}
        </CommentMeta>
        {children}
      </Content>
    </CommentContainer>
  </WithLoadingSpinner>
);

WithUserInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  comment: PropTypes.shape({
    user: PropTypes.string.isRequired,
    creationDate: PropTypes.number.isRequired
  })
};

const getRef = props => firebase.database().ref(`users/${props.comment.user}`);

export default injectFirebaseData(WithUserInfo, getRef, true);
