import React, { Component } from 'react';
import glamorous from 'glamorous';

const Text = glamorous.textarea({
  margin: 0,
  padding: 0,
  width: '100%',
  lineHeight: 1.6,
  background: 'none',
  font: 'inherit',
  border: 0,
  outlineWidth: 0,
  resize: 'none'
}, ({ height }) => ({
  height
}));

export default class FormattedText extends Component {
  state = { height: 0 };

  id = `text${Math.random()}`;

  componentDidMount() {
    this.updateHeight();
    window.addEventListener('resize', this.updateHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
  }

  componentDidUpdate() {
    if (this.getScrollHeight() !== this.state.height) this.updateHeight();
  }

  updateHeight = () => {
    this.setState({ height: 0 });
    this.setState({
      height: this.getScrollHeight()
    });
  }

  getScrollHeight = () => (document.getElementById(this.id) || {}).scrollHeight;

  render() {
    const { children, ...props } = this.props;
    return (
      <Text
        id={this.id}
        value={children}
        readOnly
        height={this.state.height}
        {...props}
      />
    );
  }
}
