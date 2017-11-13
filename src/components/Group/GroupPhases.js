import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import Phase from './Phase';
import NotFoundTitle from '../NotFoundTitle';
import WithLoadingSpinner from '../WithLoadingSpinner';
import injectFirebaseData from '../InjectFirebaseData';

const getPhaseList = phases => Object.keys(phases || {});

const GroupPhases = ({ loading, data }) => (
  <WithLoadingSpinner loading={loading}>
    {getPhaseList(data.phases).length === 0 ? (
      <NotFoundTitle>
        {`This group doesn't have any phases`}
      </NotFoundTitle>
    ) : (
      getPhaseList(data.phases).map((phase, index) =>
        <Phase phaseKey={phase} isFirst={index === 0} key={phase} />
      )
    )}
  </WithLoadingSpinner>
);

GroupPhases.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  group: PropTypes.shape({
    project: PropTypes.string.isRequired
  }).isRequired
};

const getRef = props => firebase.database().ref(`projects/${props.group.project}`);

export default injectFirebaseData(GroupPhases, getRef);
