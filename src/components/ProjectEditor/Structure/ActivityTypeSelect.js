import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { NORMAL, INPUT, CHECKLIST, MULTI } from '../../../lib/activityTypes';
import { primaryColor } from '../../../styles';

const ActivityTypeSelect = ({ value, onChange, width, ...props }) => (
  <SelectField
    floatingLabelText="Activity type"
    value={value}
    onChange={onChange}
    selectedMenuItemStyle={{ color: primaryColor }}
    style={{ width: width || '100%' }}
    {...props}
  >
    <MenuItem value={NORMAL} primaryText="Normal" />
    <MenuItem value={INPUT} primaryText="With input" />
    <MenuItem value={CHECKLIST} primaryText="With checklist" />
    <MenuItem value={MULTI} primaryText="Multiactivity" />
  </SelectField>
);

ActivityTypeSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.any
};

export default ActivityTypeSelect;
