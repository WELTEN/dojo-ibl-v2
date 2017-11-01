import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Paper from 'material-ui/Paper';
import { white, blue500 } from 'material-ui/styles/colors';
import { flattenFirebaseList } from '../../../lib/Firebase';
import TemplatePhases from './TemplatePhases';

const Item = glamorous(Paper)({
  marginBottom: 24,
  padding: 18,
  maxWidth: 'calc(33.3333% - 16px)',
  flex: 1
});

const Header = glamorous.header({
  marginBottom: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const Name = glamorous.h3({
  marginTop: 0,
  marginBottom: 0,
});

const Lang = glamorous.span({
  float: 'right',
  padding: 4,
  color: white,
  backgroundColor: blue500,
  fontSize: 12,
  borderRadius: 2,
});

const Template = ({ template, onChoose }) => (
  <Item>
    <Header>
      <Name>{template.name}</Name>
      <Lang>{template.language}</Lang>
    </Header>
    <div>{template.description}</div>
    <div>{template.author}</div>
    <TemplatePhases phases={flattenFirebaseList(template.phases)} />
  </Item>
);

Template.propTypes = {
  template: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    language: PropTypes.string.isRequired,
    author: PropTypes.string,
    phases: PropTypes.object
  }).isRequired
};

export default Template;
