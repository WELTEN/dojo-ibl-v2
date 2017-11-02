import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import TemplateCol from './TemplateCol';

const TemplateContainer = glamorous.section({
  marginBottom: -24,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
});

const splitTemplatesInCols = (templates) => {
  const indexPerCol = templates.length / 3;
  const col1Index = Math.ceil(indexPerCol);
  const col2Index = col1Index + Math.floor(indexPerCol);
  const col3Index = col2Index + Math.floor(indexPerCol);
  const col1 = templates.slice(0, col1Index);
  const col2 = templates.slice(col1Index, col2Index);
  const col3 = templates.slice(col2Index, col3Index);
  return { col1, col2, col3 };
};

const TemplateOverview = ({ templates, onChoose }) => {
  const { col1, col2, col3 } = splitTemplatesInCols(templates);

  return (
    <TemplateContainer>
      <TemplateCol col={col1} onChoose={onChoose} />
      <TemplateCol col={col2} onChoose={onChoose} />
      <TemplateCol col={col3} onChoose={onChoose} />
    </TemplateContainer>
  );
};

TemplateOverview.propTypes = {
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChoose: PropTypes.func.isRequired
};

export default TemplateOverview;
