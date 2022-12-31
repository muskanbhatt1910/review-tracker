import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};


export default class NameFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            optionSelected: [],
            storeOptions: []
        };
    }

    handleChange = (value, event) => {
        let retVal
        console.log("Handle change called and value is :", value)
        if (event.action === "select-option" && event.option.value === "*") {
            console.log("this.props.storeOptions",this.props.storeOptions)
            retVal = [{ label: "All", value: "*" }, ...this.props.storeOptions]
            this.setState({
                optionSelected: [...this.props.storeOptions]
            });
        } else if (event.action === "deselect-option" && event.option.value === "*") {
            retVal = []
            this.setState({
                optionSelected: []
            });
        } else if (event.action === "deselect-option") {
            retVal = value.filter(o => o.value !== "*")
            this.setState({
                optionSelected: value.filter(o => o.value !== "*")
            });
        } else if (event.action === "remove-value") {
            if (event.removedValue.value === "*") {
                retVal = []
                this.setState({
                    optionSelected: []
                });
            }
            else {
                retVal = value.filter(o => o.value !== "*")
                this.setState({
                    optionSelected: value.filter(o => o.value !== "*")
                });
            }
        } else if ((value.filter(o => o.value !== "*")).length === this.props.storeOptions.length-1) {
            retVal = [{ label: "All", value: "*" }, ...this.props.storeOptions]
            this.setState({
                optionSelected: [...this.props.storeOptions]
            });
        } else {
            retVal = value
            this.setState({
                optionSelected: value
            });
        }

        this.props.setnameFilterValue(retVal)
    };

    componentDidMount(){
        this.setState({
            storeOptions: this.props.storeOptions
        });
    }

    render() {

        return (
            <div>
                <span
                    class="d-inline-block"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-content="Please selecet account(s)"
                >
                    <ReactSelect
                        options={this.props.storeOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                            Option
                        }}
                        onChange={this.handleChange}
                        allowSelectAll={true}
                        value={this.state.optionSelected}
                        placeholder="Select Store"
                        
                    />
                </span>
            </div>
        );
    }
}