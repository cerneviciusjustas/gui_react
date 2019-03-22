import React, { Component } from "react";

class MoreBtn extends Component {
  state = { open: this.props.selected, checked: this.props.checked };

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.setState({ open: this.props.selected });
    }
    if (prevProps.checked !== this.props.checked) {
      this.setState({ checked: this.props.checked });
    }
  }

  pathStyle = { fill: "none", stroke: "currentColor", strokeWidth: "2px" };

  render() {
    return (
      <div
        id="more"
        ref={this.props.childRef}
        className={
          this.state.open || this.state.checked
            ? "common_button selected"
            : "common_button"
        }
        onClick={this.props.onPress}
      >
        More
        <div
          className="arrow_wrapper"
          id="arrow_wrapper"
          style={{ display: this.state.checked ? "none" : "inline-block" }}
        >
          <svg
            id="arrow"
            className={
              this.state.open !== null
                ? this.state.open
                  ? "arrow arrow_up"
                  : "arrow arrow_down"
                : "arrow"
            }
            viewBox="0 0 8 5"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.35"
          >
            <path d="M7 1.053L4.027 4 1 1" stroke="currentColor" fill="none" />
          </svg>
        </div>
        <div
          className="x_wrapper"
          id="x_wrapper"
          style={{ display: this.state.checked ? "inline-block" : "none" }}
        >
          <svg
            className="x"
            id="x_icon"
            viewBox="0 0 9.85 9.93"
            onClick={event => this.props.onDeletePress(event)}
          >
            <path
              style={this.pathStyle}
              d="M.71.79l8.43 8.43M9.14.71L.71 9.14"
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default MoreBtn;
