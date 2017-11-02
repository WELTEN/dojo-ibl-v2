import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Template from './Template';

const Col = glamorous.div({
  maxWidth: 'calc(33.3333% - 16px)',
  flex: 1
});

const TemplateCol = ({ col, onChoose }) => (
  <Col>
    {col.map((template) =>
      <Template
        template={template}
        onChoose={onChoose}
        key={template.key}
      />
    )}
  </Col>
);

TemplateCol.propTypes = {
  col: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChoose: PropTypes.func.isRequired
};

export default TemplateCol;
