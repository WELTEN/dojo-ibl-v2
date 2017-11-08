import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { black, grey600 } from 'material-ui/styles/colors';
import moment from 'moment';

const Name = glamorous.h4({
  marginTop: 0,
  marginBottom: 4,
  width: '100%',
  color: black,
  fontSize: 16,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap'
});

const CreationDate = glamorous.div({
  color: grey600,
  fontSize: 14
});

const TitleDateBlock = ({ title, date, width }) => (
  <div style={{ width }}>
    <Name>{title}</Name>
    <CreationDate>
      {moment(date).calendar()}
    </CreationDate>
  </div>
);

TitleDateBlock.defaultProps = {
  width: 240
};

TitleDateBlock.propTypes = {
  title: PropTypes.any.isRequired,
  date: PropTypes.number.isRequired,
  width: PropTypes.any
};

export default TitleDateBlock;
