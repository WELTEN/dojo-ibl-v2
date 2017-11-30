import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import TitleDateBlock from '../TitleDateBlock';
import Link from '../Link';
import ProjectActions from './ProjectActions';
import PaperListItem from '../PaperListItem';
import injectFirebaseData from '../InjectFirebaseData';
import Aux from 'react-aux';

const Project = ({ loading, data }) => {
  if (data == null) return null;
  return (
    <PaperListItem loading={loading}>
      {!loading &&
        <Aux>
          <TitleDateBlock
            title={
              <Link to={`projects/${data.key}/edit`} unstyled>
                {data.title}
              </Link>
            }
            date={data.creationDate}
            width="calc(100% - 120px)"
          />
          <ProjectActions project={data} />
        </Aux>
      }
    </PaperListItem>
  );
};

Project.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  projectKey: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`projects/${props.projectKey}`);

export default injectFirebaseData(Project, getRef, true);
