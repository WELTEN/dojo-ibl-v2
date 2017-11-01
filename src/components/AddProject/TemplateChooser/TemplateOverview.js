import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Template from './Template';

const TemplateContainer = glamorous.section({
  marginBottom: -24,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
});

const TemplateOverview = ({ templates, onChoose }) => (
  <TemplateContainer>
    {templates.map((template) =>
      <Template
        template={template}
        onChoose={onChoose}
        key={template.key}
      />
    )}
  </TemplateContainer>
);

TemplateOverview.propTypes = {
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChoose: PropTypes.func.isRequired
};

export default TemplateOverview;
