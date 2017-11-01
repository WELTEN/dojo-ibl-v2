import React from 'react';
import PageTitle from '../components/PageTitle';
import Add from 'material-ui/svg-icons/content/add';
import FloatingActionButton from '../components/FloatingActionButton';

const Projects = () => (
  <div>
    <PageTitle>Projects</PageTitle>
    <FloatingActionButton>
      <Add />
    </FloatingActionButton>
  </div>
);

export default Projects;
