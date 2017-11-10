import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import PaperListItem from '../PaperListItem';
import GroupListItem from '../GroupListItem';
import GroupActions from './GroupActions';
import injectFirebaseData from '../InjectFirebaseData';

const Group = ({ loading, data, history }) => {
  if (data == null) return null;
  return (
    <PaperListItem
      loading={loading}
      onClick={() => history.push(`groups/${data.key}`)}
    >
      {!loading &&
        <GroupListItem
          group={data}
          actions={group => <GroupActions group={data} />}
          title={data.name}
        />
      }
    </PaperListItem>
  );
};

Group.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  history: PropTypes.object.isRequired,
  groupKey: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`groups/${props.groupKey}`);

export default withRouter(injectFirebaseData(Group, getRef, true));
