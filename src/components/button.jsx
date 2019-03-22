import React, { Component } from "react";
import Price from "./price";

class Button extends Component {
  state = { selected: this.props.selected };

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.setState({ selected: this.props.selected });
    }
  }
  render() {
    return (
      <div
        className={
          this.state.selected ? "common_button selected" : "common_button"
        }
        onClick={() => this.props.onPress(this.props.id)}
      >
        {this.props.label} <Price label={this.props.priceLabel} />
      </div>
    );
  }
}

export default Button;
