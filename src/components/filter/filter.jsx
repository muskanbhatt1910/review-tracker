import React, { Component } from "react";
import ReactDOM from "react-dom";
// import { colourOptions } from "./data.js";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import Chart from "../chart/Chart.jsx";
import Widget from "../widget/Widget.jsx";
import './filter.scss';
import { useState, useEffect } from 'react';

const Spinner = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    return (
        <div>
            {loading ?
                <span className="container">
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                </span>
                :
                null
            }
        </div>
    );
};

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

export function setTabSel(tab) {
    // this.setState({
    //     tabSel: tab
    // });
    this.state.tabSel = tab
}

export default class FilteredData extends Component {
    state = {}
    constructor(props) {
        super(props);
        this.state = {
            optionSelected: [],
            storeOptions: [],
            tabSel: "total_rating"
        };
        setTabSel = setTabSel.bind(this)
    }

    componentDidMount() {
        fetch("https://matrik.pythonanywhere.com/stores/")
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    storeOptions: data
                });
                // // console.log("Store Options: ", this.state.storeOptions);
                this.setState({
                    optionSelected: [{ label: "All", value: "*" }, ...this.state.storeOptions]
                });

            })
            .catch((err) => {
                // // console.log(err.message);
                // // console.log("Error here!");
                // // console.log(err.message);
            });
        // // // console.log("Component Mounted")
        // // // console.log("this.state.storeOptions: ",this.state.storeOptions)
        // this.setState({
        //     optionSelected: this.state.storeOptions
        // });
    }

    //     componentDidUpdate() {
    //         fetch("https://matrik.pythonanywhere.com/stores")
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 // // console.log("Data from API");
    //                 // // console.log(data);
    //                 this.setState({
    //                     storeOptions: data
    //                 });
    //                 // // console.log("Stoe Options");
    //                 // // console.log(this.state.storeOptions);
    //             })
    //             .catch((err) => {
    //                 // // console.log(err.message);
    //             });
    // }

    handleChange = (value, event) => {
        // // console.log("event action: ", event)
        // // console.log("value: ", value)
        // this.setState({
        //     optionSelected: selected
        // });
        // if(selected.length==0){
        //     this.setState({
        //         optionSelected: this.state.storeOptions
        //     });
        // }
        // else {
        //     this.setState({
        //         optionSelected: selected
        //     });
        // }
        // this.state.optionSelected = selected
        // // // console.log("this.state.optionSelected-HandleChange: ",this.state.optionSelected)
        if (event.action === "select-option" && event.option.value === "*") {
            this.setState({
                optionSelected: [{ label: "All", value: "*" }, ...this.state.storeOptions]
            });
        } else if (event.action === "deselect-option" && event.option.value === "*") {
            this.setState({
                optionSelected: []
            });
        } else if (event.action === "deselect-option") {
            this.setState({
                optionSelected: value.filter(o => o.value !== "*")
            });
        } else if (event.action === "remove-value") {
            if (event.removedValue.value === "*") {
                this.setState({
                    optionSelected: []
                });
            }
            else {
                this.setState({
                    optionSelected: value.filter(o => o.value !== "*")
                });
            }
        } else if ((value.filter(o => o.value !== "*")).length === this.state.storeOptions.length) {
            this.setState({
                optionSelected: [{ label: "All", value: "*" }, ...this.state.storeOptions]
            });
        } else {
            this.setState({
                optionSelected: value
            });
        }
    };

    convertStoresFormat = (optionSelectedLabelValue) => {
        let selectedStoreList = null
        if (optionSelectedLabelValue) {
            selectedStoreList = optionSelectedLabelValue.map((store) => store['value']);
        }

        // // console.log("this.state.optionSelected: ", optionSelectedLabelValue)
        // // console.log("selectedStoreList: ", selectedStoreList)
        return selectedStoreList
    }
    // ChartNew = new Chart();
    render() {

        return (
            <div>
                {/* <span className="container">
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                </span> */}
                <Spinner />

                <span
                    class="d-inline-block"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-content="Please selecet account(s)"
                >

                    <ReactSelect
                        options={[{ label: "All", value: "*" }, ...this.state.storeOptions]}
                        // options={this.state.storeOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                            Option
                        }}
                        onChange={this.handleChange}
                        allowSelectAll={true}
                        value={this.state.optionSelected}
                        defa
                    />
                </span>
                <Widget tabSel={this.state.tabSel} selectedStores={this.convertStoresFormat(this.state.optionSelected.filter(o => o.value !== "*"))} />
                {/* <Chart tabSel = {this.state.tabSel} selectedStores={this.convertStoresFormat(this.state.optionSelected.filter(o => o.value !== "*"))} /> */}
                {/* <Widget selectedStore={
                    () => {
                        let selectedStoreList = this.state.optionSelected.map((store) => store['value']);
                        // // console.log("this.state.optionSelected: ", this.state.optionSelected)
                        // // console.log("selectedStoreList: ", selectedStoreList)
                        return selectedStoreList
                    }
                } /> */}
            </div>
        );
    }
}