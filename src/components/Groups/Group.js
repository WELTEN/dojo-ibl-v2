import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import Link from '../Link';
import PaperListItem from '../PaperListItem';
import GroupListItem from '../GroupListItem';
import GroupActions from './GroupActions';
import injectFirebaseData from '../InjectFirebaseData';

const Group = ({ loading, data }) => {
  if (data == null) return null;
  return (
    <PaperListItem loading={loading}>
      {!loading &&
        <GroupListItem
          group={data}
          actions={group => <GroupActions group={data} />}
          title={
            <Link to={`groups/${data.key}`} unstyled>
              {data.name}
            </Link>
          }
        />
      }
    </PaperListItem>
  );
};

Group.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  groupKey: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`groups/${props.groupKey}`);

export default injectFirebaseData(Group, getRef, true);
