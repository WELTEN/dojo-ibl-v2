import React from 'react';
import PageTitle from '../components/PageTitle';
import ProjectList from '../components/Projects/ProjectList';
import Add from 'material-ui/svg-icons/content/add';
import FloatingActionButton from '../components/FloatingActionButton';
import Link from '../components/Link';

const Projects = () => (
  <div>
    <PageTitle>Projects</PageTitle>
    <ProjectList />
    <Link to="/projects/add">
      <FloatingActionButton>
        <Add />
      </FloatingActionButton>
    </Link>
  </div>
);

export default Projects;
