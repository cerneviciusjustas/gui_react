import React, { Component } from "react";

class DropDownItem extends Component {
  state = { checked: this.props.checked };

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.setState({ checked: this.props.checked });
    }
  }
  render() {
    return (
      <li className="dropdown_line">
        <div className="dropdown_item">
          <input
            type="checkbox"
            className="checkbox"
            onClick={() => this.props.onInputPress(this.props.id)}
            name="Pickup_Truck"
            checked={this.props.checked}
          />
        </div>
        <div
          onClick={() => this.props.onInputPress(this.props.id)}
          className="dropdown_item"
        >
          {this.props.label}
        </div>
        <div
          className="dropdown_item"
          onClick={() => this.props.onOnlyPress(this.props.id)}
        >
          <span className="only">only</span>
        </div>
        <div className="dropdown_item">
          <span className="price right_align">{this.props.priceLabel}</span>
        </div>
      </li>
    );
  }
}

export default DropDownItem;
