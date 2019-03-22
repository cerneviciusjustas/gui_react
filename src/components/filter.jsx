import React, { Component } from "react";
import Button from "./button";
import MoreBtn from "./moreButton";
import AllBtn from "./allButton";
import DropDownItem from "./dropDownItem";

class Filter extends Component {
  state = {
    allSelected: true,
    simpleBtn: [
      { id: "Small", selected: false, label: "Small", priceLabel: "$422+" },
      { id: "Medium", selected: false, label: "Medium", priceLabel: "$433+" },
      { id: "Large", selected: false, label: "Large", priceLabel: "$456+" },
      { id: "SUV", selected: false, label: "SUV", priceLabel: "$525+" },
      { id: "Van", selected: false, label: "Van", priceLabel: "$649+" }
    ],
    moreSelected: null,
    dropDownChecked: false,
    dropDownOpen: false,
    checkBoxes: [
      { checked: false, id: "Pickup Truck", priceLabel: "$594" },
      { checked: false, id: "Luxury", priceLabel: "$626" },
      { checked: false, id: "Commercial", priceLabel: "$1248" },
      { checked: false, id: "Convertible", priceLabel: "$1607" }
    ],
    dropDownLeft: 600
  };

  myRef = React.createRef();

  handleOnly = id => {
    this.doDeselectSimpleButtons();
    this.setState(state => {
      const checkBoxes = state.checkBoxes.map(item =>
        item.id === id
          ? {
              checked: true,
              id: item.id,
              priceLabel: item.priceLabel
            }
          : {
              checked: false,
              id: item.id,
              priceLabel: item.priceLabel
            }
      );
      return { checkBoxes };
    });
    this.setState({ allSelected: false });
    this.setState({ dropDownChecked: true });
  };

  handleCheck = id => {
    this.setState(
      state => {
        const checkBoxes = state.checkBoxes.map(item =>
          item.id === id
            ? {
                checked: !item.checked,
                id: item.id,
                priceLabel: item.priceLabel
              }
            : item
        );
        return { checkBoxes };
      },
      () => {
        this.doCheckIfAllDeselected();
        let isSelected = false;
        this.state.checkBoxes.map(item => {
          if (item.checked === true) isSelected = true;
          return item;
        });
        if (isSelected) this.setState({ dropDownChecked: true });
        else this.setState({ dropDownChecked: false });
      }
    );
  };

  handleAllButton = () => {
    if (this.state.allSelected === false) {
      this.setState({ allSelected: !this.state.allSelected });
      this.doDeselectSimpleButtons();
      this.doDeselectCheckBoxes();
      this.setState({ dropDownChecked: false });
    }
  };

  doSelectedButton = id => {
    this.setState(
      state => {
        const simpleBtn = state.simpleBtn.map(item =>
          item.id === id
            ? {
                selected: !item.selected,
                label: item.label,
                priceLabel: item.priceLabel,
                id: item.id
              }
            : item
        );
        return { simpleBtn };
      },
      () => {
        this.doCheckIfAllDeselected();
      }
    );
  };

  doDeselectSimpleButtons = () => {
    this.setState(state => {
      const simpleBtn = state.simpleBtn.map(item => ({
        selected: false,
        label: item.label,
        priceLabel: item.priceLabel,
        id: item.id
      }));
      return { simpleBtn };
    });
  };

  doCheckIfAllDeselected = () => {
    let isSelected = false;
    this.state.simpleBtn.map(item => {
      if (item.selected === true) isSelected = true;
      return item;
    });
    this.state.checkBoxes.map(item => {
      if (item.checked === true) isSelected = true;
      return item;
    });
    if (isSelected) this.setState({ allSelected: false });
    else this.setState({ allSelected: true });
  };

  doDeselectCheckBoxes = () => {
    this.setState(state => {
      const checkBoxes = state.checkBoxes.map(item => ({
        checked: false,
        id: item.id,
        priceLabel: item.priceLabel
      }));
      return { checkBoxes };
    });
  };

  handleButton = id => {
    this.doSelectedButton(id);
  };

  handleMoreButton = () => {
    this.setState({ moreSelected: !this.state.moreSelected });
    this.setState({
      dropDownLeft: this.myRef.current.getBoundingClientRect().left,
      dropDownOpen: !this.state.dropDownOpen
    });
    if (!this.state.dropDownOpen) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else
      document.removeEventListener("click", this.handleOutsideClick, false);
  };

  handleDeleteButton = event => {
    this.doDeselectCheckBoxes();
    this.setState({ dropDownChecked: false }, () => {
      let isSelected = false;
      this.state.simpleBtn.map(item => {
        if (item.selected === true) isSelected = true;
        return item;
      });
      if (isSelected) this.setState({ allSelected: false });
      else this.setState({ allSelected: true });
    });
    this.setState({ dropDownOpen: false });
    this.setState({ moreSelected: false });
    this.setState({
      dropDownLeft: this.myRef.current.getBoundingClientRect().left,
      dropDownOpen: false
    });
    document.removeEventListener("click", this.handleOutsideClick, false);
    event.stopPropagation();
  };

  handleOutsideClick = e => {
    if (this.node.contains(e.target) || !document.getElementById("x_wrapper")) {
      return;
    }

    this.handleMoreButton();
    if (!this.state.dropDownOpen)
      document.removeEventListener("click", this.handleOutsideClick, false);
  };

  render() {
    return (
      <React.Fragment>
        <AllBtn
          id="All"
          label="All"
          selected={this.state.allSelected}
          onPress={this.handleAllButton}
        />
        {this.state.simpleBtn.map(btn => (
          <Button
            id={btn.id}
            label={btn.label}
            priceLabel={btn.priceLabel}
            selected={btn.selected}
            onPress={this.handleButton}
          />
        ))}
        <MoreBtn
          id="more"
          selected={this.state.moreSelected}
          checked={this.state.dropDownChecked}
          onPress={this.handleMoreButton}
          onDeletePress={this.handleDeleteButton}
          childRef={this.myRef}
        />
        <div
          ref={node => {
            this.node = node;
          }}
          className="wrapper"
          id="wrapper"
          style={{
            left: this.state.dropDownLeft + "px",
            display: this.state.dropDownOpen ? "block" : "none"
          }}
        >
          <div className="more_content" id="more_content">
            <ul>
              {this.state.checkBoxes.map(item => (
                <DropDownItem
                  id={item.id}
                  checked={item.checked}
                  label={item.id}
                  priceLabel={item.priceLabel}
                  onOnlyPress={this.handleOnly}
                  onInputPress={this.handleCheck}
                />
              ))}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Filter;
