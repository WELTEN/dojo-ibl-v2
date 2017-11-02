import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Paper from 'material-ui/Paper';
import { white, blue500 } from 'material-ui/styles/colors';
import { flattenFirebaseList } from '../../../lib/Firebase';
import TemplatePhases from './TemplatePhases';
import FlatButton from 'material-ui/FlatButton';

const ItemContainer = glamorous.div({
  marginBottom: 24,
  maxWidth: 'calc(33.3333% - 16px)',
  flex: 1
});

const Item = glamorous(Paper)({
  padding: 18,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
})

const Header = glamorous.header({
  marginBottom: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const Field = glamorous.div({
  marginBottom: 16
});

const FieldTitle = glamorous.h5({
  marginTop: 0,
  marginBottom: 8
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

const ChooseButton = glamorous(FlatButton)({ alignSelf: 'flex-start' });

const Template = ({ template, onChoose }) => (
  <ItemContainer>
    <Item>
      <div>
        <Header>
          <Name>{template.name}</Name>
          <Lang>{template.language}</Lang>
        </Header>
        {template.description &&
          <Field>
            <FieldTitle>Description</FieldTitle>
            {template.description}
          </Field>
        }
        {template.author &&
          <Field>
            <FieldTitle>Author</FieldTitle>
            {template.author}
          </Field>
        }
        <Field>
          <FieldTitle>Phases</FieldTitle>
          <TemplatePhases phases={flattenFirebaseList(template.phases)} />
        </Field>
      </div>
      <ChooseButton
        label="Choose this template"
        onClick={() => onChoose(template.key)}
        primary
      />
    </Item>
  </ItemContainer>
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
