import React from 'react';
import glamorous from 'glamorous';
import PageTitle from '../components/PageTitle';
import Link from '../components/Link';
import FlatButton from 'material-ui/FlatButton';

const PageContent = glamorous.div({ textAlign: 'center' });

const NotFound = () => (
  <PageContent>
    <PageTitle>Page not found</PageTitle>
    <Link to="/">
      <FlatButton label="Go to homepage" primary />
    </Link>
  </PageContent>
);

export default NotFound;
