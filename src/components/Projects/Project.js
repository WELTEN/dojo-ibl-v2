import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import TitleDateBlock from '../TitleDateBlock';
import ListItem from '../ListItem';
import LoadingSpinner from '../LoadingSpinner';
import Link from '../Link';
import ProjectActions from './ProjectActions';
import Paper from 'material-ui/Paper';
import injectFirebaseData from '../InjectFirebaseData';

const ItemPaper = glamorous(Paper)({
  marginBottom: 12,
  padding: 12,
  ':last-of-type': {
    marginBottom: '80px !important'
  }
});

const Item = glamorous(ListItem)({ marginBottom: 0 });

const Project = ({ loading, data }) => {
  if (data == null) return null;
  return (
    <ItemPaper>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Item>
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
        </Item>
      )}
    </ItemPaper>
  );
};

Project.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  projectKey: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`projects/${props.projectKey}`);

export default injectFirebaseData(Project, getRef, true);
