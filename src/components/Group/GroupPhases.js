import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import Phase from './Phase';
import NotFoundTitle from '../NotFoundTitle';
import WithLoadingSpinner from '../WithLoadingSpinner';
import injectFirebaseData from '../InjectFirebaseData';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { transition } from '../../styles';

const PhaseList = glamorous.div({
  float: 'left',
  marginTop: 14,
  width: '100%',
  transition
}, ({ collapsed }) => {
  if (collapsed) return { width: '25%' };
});

const getPhaseList = phases => Object.keys(phases || {});

const GroupPhases = ({ loading, data, collapsed, group }) => (
  <WithLoadingSpinner loading={loading}>
    {getPhaseList(data.phases).length === 0 ? (
      <NotFoundTitle>
        {`This group doesn't have any phases`}
      </NotFoundTitle>
    ) : (
      <PhaseList collapsed={collapsed}>
        {getPhaseList(data.phases).map((phase, index) =>
          <Phase
            phaseKey={phase}
            isFirst={index === 0}
            group={group}
            key={phase}
          />
        )}
      </PhaseList>
    )}
  </WithLoadingSpinner>
);

GroupPhases.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  collapsed: PropTypes.bool.isRequired,
  group: PropTypes.shape({
    project: PropTypes.string.isRequired
  }).isRequired,
};

const getRef = props => firebase.database().ref(`projects/${props.group.project}`);

const mapStateToProps = state => ({ collapsed: state.open });

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps)(injectFirebaseData(GroupPhases, getRef))
);
