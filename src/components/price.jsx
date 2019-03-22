import React, { Component } from "react";

class Price extends Component {
  state = {};
  render() {
    return <span className="price">{this.props.label}</span>;
  }
}

export default Price;
