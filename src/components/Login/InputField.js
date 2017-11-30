import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import TextField from 'material-ui/TextField';
import { white as muiWhite } from 'material-ui/styles/colors';
import { primaryColor } from '../../styles';

const Input = glamorous(TextField)({ marginTop: -14 });

const InputField = ({ label, value, onChange, errorText, type, white }) => (
  <Input
    floatingLabelText={label}
    value={value}
    onChange={onChange}
    errorText={errorText}
    type={type}
    inputStyle={{ color: white ? muiWhite : 'inherit' }}
    floatingLabelStyle={white ? { color: 'rgba(255, 255, 255, .7)' } : {}}
    floatingLabelFocusStyle={white ? { color: primaryColor } : {}}
    fullWidth
  />
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorText: PropTypes.string,
  type: PropTypes.string,
  white: PropTypes.bool
};

export default InputField;
