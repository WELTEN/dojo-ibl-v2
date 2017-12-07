import React from 'react';
import PropTypes from 'prop-types';
import WithLoadingSpinner from '../WithLoadingSpinner';
import NotFoundTitle from '../NotFoundTitle';
import * as firebase from 'firebase';
import AccessVerifier from './AccessVerifier';
import EditorTabs from './EditorTabs';
import DeleteProject from './DeleteProject';
import injectFirebaseData from '../InjectFirebaseData';

const ProjectEditor = ({ loading, data, projectKey, withDelete }) => (
  <WithLoadingSpinner loading={loading}>
    {data ? (
      <AccessVerifier project={data}>
        <EditorTabs project={data} />
        {withDelete &&
          <DeleteProject projectKey={projectKey} />
        }
      </AccessVerifier>
    ) : (
      <NotFoundTitle>{`Project doesn't exist`}</NotFoundTitle>
    )}
  </WithLoadingSpinner>
);

ProjectEditor.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  projectKey: PropTypes.string.isRequired,
  withDelete: PropTypes.bool
};

const getRef = props => firebase.database().ref(`projects/${props.projectKey}`);

export default injectFirebaseData(ProjectEditor, getRef, true);
