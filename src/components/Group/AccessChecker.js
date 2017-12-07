import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import NotFoundTitle from '../NotFoundTitle';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';
import { addCurrentUserToGroup } from '../../lib/Firebase';

const Content = glamorous.div({ textAlign: 'center' });

const currentUserHasAccess = (group) => {
  const currentUser = firebase.auth().currentUser;
  return typeof group.users[currentUser.uid] !== 'undefined';
};

const AccessChecker = ({ group, children }) => {
  if (currentUserHasAccess(group)) return children;
  return (
    <Content>
      <NotFoundTitle>{`You haven't joined this group yet`}</NotFoundTitle>
      <FlatButton
        label="Join group"
        onClick={() => addCurrentUserToGroup(group.key, group.project)}
        primary
      />
    </Content>
  );
};

AccessChecker.propTypes = {
  group: PropTypes.shape({
    key: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.node
};

export default AccessChecker;
