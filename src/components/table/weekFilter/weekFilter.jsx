import React from 'react';
import Select from 'react-select';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

function convertToLabelValueFormat(weekList){
    let weekListLabelValue = []
    weekList.forEach((week) => {
        let tempWeek = {
            value: week,
            label: week
        }
        weekListLabelValue.push(tempWeek)
    });
    return weekListLabelValue
}

export default class WeekFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weekSelected: ""
        };
    }

    handleChange = (value) => {
        console.log("Value selected in dropdown", value)
        this.props.setweekFilterValue(value)
        this.setState({
            weekSelected: value
        });
    };

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
                        options={[{ label: "All", value: "*" },...convertToLabelValueFormat(this.props.weekList)]} 
                        onChange={this.handleChange}
                        value={this.state.weekSelected}
                        placeholder="Select Week"
                        // defaultInputValue={"52"}
                    />
                </span>
            </div>
        );
    }
}