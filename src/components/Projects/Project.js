import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import TitleDateBlock from '../TitleDateBlock';
import ListItem from '../ListItem';
import LoadingSpinner from '../LoadingSpinner';
import Link from '../Link';
import ProjectActions from './ProjectActions';
import Paper from 'material-ui/Paper';

const ItemPaper = glamorous(Paper)({
  marginBottom: 12,
  padding: 12,
  ':last-of-type': {
    marginBottom: '80px !important'
  }
});

const Item = glamorous(ListItem)({ marginBottom: 0 });

export default class Project extends Component {
  static propTypes = {
    projectKey: PropTypes.string.isRequired
  };

  state = {
    loading: true,
    project: {}
  };

  getRef = () => firebase.database().ref(`projects/${this.props.projectKey}`);

  componentDidMount = () => {
    this.getRef().on('value', (snapshot) => {
      const project = snapshot.val();
      if (project != null) project.key = this.props.projectKey;
      this.setState({
        loading: false,
        project
      });
    });
  };

  componentWillUnmount = () => this.getRef().off();

  render = () => {
    if (this.state.project == null) return null;
    return (
      <ItemPaper>
        {this.state.loading ? (
          <LoadingSpinner />
        ) : (
          <Item>
            <TitleDateBlock
              title={
                <Link to={`projects/${this.state.project.key}/edit`} unstyled>
                  {this.state.project.title}
                </Link>
              }
              date={this.state.project.creationDate}
              width="calc(100% - 120px)"
            />
            <ProjectActions project={this.state.project} />
          </Item>
        )}
      </ItemPaper>
    );
  };
}
