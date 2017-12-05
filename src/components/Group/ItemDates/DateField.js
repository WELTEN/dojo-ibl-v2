import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as firebase from 'firebase';
import DatePicker from 'material-ui/DatePicker';
import { grey500 } from 'material-ui/styles/colors';

const Field = glamorous.section({
  marginBottom: 4,
  marginLeft: 12,
  marginRight: 12,
  flex: 1
});

const FieldTitle = glamorous.h4({
  marginTop: 0,
  marginBottom: -8,
  color: grey500,
  fontWeight: 400
});

export default class DateField extends Component {
  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    fieldTitle: PropTypes.string.isRequired,
    activityKey: PropTypes.string.isRequired,
    activity: PropTypes.shape({
      startDate: PropTypes.number,
      endDate: PropTypes.number,
      plannedStartDate: PropTypes.number,
      plannedEndDate: PropTypes.number
    }).isRequired,
    group: PropTypes.string.isRequired,
    shouldDisableDate: PropTypes.func.isRequired,
    afterChange: PropTypes.func
  };

  state = {
    date: this.props.activity[this.props.fieldName]
  };

  fieldRef = () =>
    firebase.database().ref(`groups/${this.props.group}/activities/${this.props.activityKey}`).child(this.props.fieldName);

  componentDidMount() {
    this.fieldRef().on('value', (snapshot) => {
      this.setState({ date: snapshot.val() });
    });
  }

  componentWillUnmount = () => this.fieldRef().off();

  dateIfPossible = (timestamp) =>
    typeof timestamp === 'number' ? new Date(timestamp) : undefined;

  handleChange = (e, date) => {
    const timestamp = date.getTime();
    this.fieldRef().set(timestamp);
    const afterChange = this.props.afterChange;
    if (afterChange) afterChange(timestamp);
  };

  render = () => {
    const date = this.dateIfPossible(this.state.date);
    return (
      <Field>
        <FieldTitle>{this.props.fieldTitle}</FieldTitle>
        <DatePicker
          hintText="Click to set date"
          value={date}
          onChange={this.handleChange}
          shouldDisableDate={this.props.shouldDisableDate}
          className="fix-border"
          fullWidth
        />
      </Field>
    );
  };
}
