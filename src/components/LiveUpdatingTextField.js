import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import TextField from 'material-ui/TextField';

export default class LiveUpdatingTextField extends Component {
  static propTypes = {
    value: PropTypes.string,
    getRef: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: ''
  };

  state = {
    value: this.props.value
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
    this.updateFirebase(value);
  };

  updateFirebase = debounce((value) => this.props.getRef().set(value));

  render = () => {
    const { value, getRef, ...props } = this.props;
    return (
      <TextField
        {...props}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  };
}
