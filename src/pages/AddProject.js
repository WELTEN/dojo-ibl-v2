import React from 'react';
import PageTitle from '../components/PageTitle';
import Aux from 'react-aux';
import Steps from '../components/AddProject/Steps';

const AddProject = () => (
  <Aux>
    <PageTitle>Add project</PageTitle>
    <Steps />
  </Aux>
);

export default AddProject;
