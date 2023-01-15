import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import NameFilter from '../../components/table/nameFilter/nameFilter'
import WeekFilter from '../../components/table/weekFilter/weekFilter'
// import FilterTable from '../../components/table/table'
import './reviewsView.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from 'react';
import { default as ReactSelect } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { mockComponent } from "react-dom/test-utils";
import Moment from 'react-moment';
import moment from "moment";
import { ReactSession } from 'react-client-session';
import Auth from '../auth/auth'; 
import { components } from "react-select";

const Spinner = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    },[props.storeFilterValue]);

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

const SpinnerAll = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    },[]);

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

var today = new Date()
class DateFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate:  new Date(new Date().setDate(today.getDate() - 30)),
            toDate: new Date()
        };
    }

    handleChangeTodate = (value) => {
        this.setState({
            toDate: value
        });
        this.props.settoDateFilterValue(value)
    };

    handleChangeFromdate = (value) => {
        this.setState({
            fromDate: value
        });
        this.props.setfromDateFilterValue(value)
    };

    render() {
        return (
            <div className="datepicker">
                <DatePicker
                    selected={this.state.fromDate}
                    dateFormat='dd/MM/yyyy'
                    onChange={this.handleChangeFromdate}
                    isClearable
                    placeholderText="Select Start Date"
                />
                <DatePicker
                    selected={this.state.toDate}
                    dateFormat='dd/MM/yyyy'
                    onChange={this.handleChangeTodate}
                    isClearable
                    placeholderText="Select End Date"
                />
            </div>
        );
    }
}

class StoreFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            storeSelected: {label: "Acer PS", value: "Acer PS"}
        };
    }

    handleChange = (value) => {
        this.setState({
            storeSelected: value
        });
        this.props.setstoreFilterValue(value)
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
                        options={this.props.storeOptions}
                        onChange={this.handleChange}
                        // defaultValue="Acer PS"
                        value={this.state.storeSelected}
                        // placeholder="Select Store"
                    />
                </span>
            </div>
        );
    }
}

class RatingFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ratingSelected: { label: 5, value: 5 },
            ratingOptions: [
                { label: 5, value: 5 },
                { label: 4, value: 4 },
                { label: 3, value: 3 },
                { label: 2, value: 2 },
                { label: 1, value: 1 }
            ]
        };
    }

    // handleChange = (value) => {
    //     this.setState({
    //         ratingSelected: value
    //     });
    //     this.props.setratingFilterValue(value)
    // };
    handleChange2 = (value, event) => {
        // // // console.log("event action: ", event)
        // // // console.log("value: ", value)
        // this.setState({
        //     ratingSelected: selected
        // });
        // if(selected.length==0){
        //     this.setState({
        //         ratingSelected: this.state.ratingOptions
        //     });
        // }
        // else {
        //     this.setState({
        //         ratingSelected: selected
        //     });
        // }
        // this.state.ratingSelected = selected
        // // // // console.log("this.state.ratingSelected-HandleChange: ",this.state.ratingSelected)
        if (event.action === "select-option" && event.option.value === "*") {
            this.setState({
                ratingSelected: [{ label: "All", value: "*" }, ...this.state.ratingOptions]
            });
        } else if (event.action === "deselect-option" && event.option.value === "*") {
            this.setState({
                ratingSelected: []
            });
        } else if (event.action === "deselect-option") {
            this.setState({
                ratingSelected: value.filter(o => o.value !== "*")
            });
        } else if (event.action === "remove-value") {
            if (event.removedValue.value === "*") {
                this.setState({
                    ratingSelected: []
                });
            }
            else {
                this.setState({
                    ratingSelected: value.filter(o => o.value !== "*")
                });
            }
        } else if ((value.filter(o => o.value !== "*")).length === this.state.ratingOptions.length) {
            this.setState({
                ratingSelected: [{ label: "All", value: "*" }, ...this.state.ratingOptions]
            });
        } else {
            this.setState({
                ratingSelected: value
            });
        }

        this.props.setratingFilterValue(value)
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
                    {/* <ReactSelect
                        options={this.state.ratingOptions}
                        onChange={this.handleChange}
                        isMulti
                        
                        // defaultValue={5}
                        value={this.state.ratingSelected}
                        placeholder="Select Rating"
                    /> */}
                    <ReactSelect
                        options={[{ label: "All", value: "*" }, ...this.state.ratingOptions]}
                        // options={this.state.storeOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                            Option
                        }}
                        onChange={this.handleChange2}
                        allowSelectAll={true}
                        value={this.state.ratingSelected}
                        placeholder="Select Rating"
                    />
                </span>
            </div>
        );
    }
}

class FilterTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Date</th>
                        <th>Store</th>
                        <th>Rating</th>
                        <th>Review</th>
                        <th>Reviewer</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        // // console.log("FIlterTable called: this.props.reviewsData",this.props.reviewsData)
                        const moment = require('moment');
                        let results = this.props.reviewsData
                        // console.log("this.props.ratingFilterValue",this.props.ratingFilterValue)
                        
                        // console.log("ratingArray",ratingArray)
                        if(this.props.ratingFilterValue){
                            console.log("this.props.ratingFilterValue",this.props.ratingFilterValue)
                            let ratingArray = this.props.ratingFilterValue.map((r) => r.value);
                            console.log("ratingArray",ratingArray)
                            // console.log("rating set")
                            // console.log("this.props.ratingFilterValue",this.props.ratingFilterValue)
                            // results = results.filter(review => review.rating == this.props.ratingFilterValue.value)
                            results = results.filter(review => ratingArray.includes(review.rating))

                            // console.log("results after rating filter", results)
                        }
                        // let results = this.props.reviewsData.filter(review => review.rating == this.props.ratingFilterValue)
                        // let results = this.props.reviewsData.filter(review => {
                        //     // // console.log("review.rating",review.rating)
                        //     // // console.log("this.props.ratingFilterValue",this.props.ratingFilterValue)
                        //     // // console.log("this.props.ratingFilterValue.value",this.props.ratingFilterValue.value)
                        //     if(review.rating == this.props.ratingFilterValue){
                        //         // // console.log("returning True")
                        //         return true
                        //     }
                        //     // // console.log("returning False")
                        //     return false
                        // })
                        console.log("results",results)
                        if(this.props.toDateFilterValue){
                            // // console.log("inside toDate Filter!")
                            // // console.log("this.props.toDateFilterValue",this.props.toDateFilterValue)
                            // // console.log("isBefore:",moment(this.props.toDateFilterValue).add(1,"days"))
                            // results = results.filter(review => moment(review.date).isBefore(moment(this.props.toDateFilterValue).add(1,"days").toDate()))
                            // results = results.filter(review => moment(review.date).isBefore(moment(this.props.toDateFilterValue),"day"))
                            // results = results.filter(review => {(()=>{
                            //     // // console.log("review.date", review.date)
                            //     // // console.log("this.props.toDateFilterValue",this.props.toDateFilterValue)
                            //     // // console.log("moment(review.date)", moment(review.date,'DD-MM-YYYY'))
                            //     // // console.log("moment(this.props.toDateFilterValue)",moment(this.props.toDateFilterValue,'DD-MM-YYYY').toDate())
                            //     // // console.log("moment(review.date).isBefore(moment(this.props.toDateFilterValue),'day')",moment(review.date,'DD-MM-YYYY').isBefore(moment(this.props.toDateFilterValue,'DD-MM-YYYY'),"day"))
                            //     if(moment(review.date,'DD-MM-YYYY').isBefore(moment(this.props.toDateFilterValue,'DD-MM-YYYY'),"day")){
                            //         // console.log("Returning True toDate")
                            //         return true
                            //     }
                            //     // console.log("Returning False toDate")
                            //     return false
                            // })()})
                            results = results.filter(review => {
                                // // console.log("review.date", review.date)
                                // // console.log("this.props.toDateFilterValue",this.props.toDateFilterValue)
                                // // console.log("moment(review.date)", moment(review.date,'DD-MM-YYYY'))
                                // // console.log("moment(this.props.toDateFilterValue)",moment(this.props.toDateFilterValue,'DD-MM-YYYY').toDate())
                                // // console.log("moment(review.date).isBefore(moment(this.props.toDateFilterValue),'day')",moment(review.date,'DD-MM-YYYY').isBefore(moment(this.props.toDateFilterValue,'DD-MM-YYYY'),"day"))
                                if(moment(review.date,'DD-MM-YYYY').isBefore(moment(this.props.toDateFilterValue,'DD-MM-YYYY').add(1,"days"),"day")){
                                    // // console.log("Returning True toDate")
                                    return true
                                }
                                // // console.log("Returning False toDate")
                                return false
                            })
                            // // console.log("results after toDateFilter", results)
                        }   
                        if(this.props.fromDateFilterValue){
                            // // console.log("this.props.fromDateFilterValue",this.props.fromDateFilterValue)
                            // // console.log("isAfter:",moment(this.props.fromDateFilterValue).subtract(1,"days"))
                            // results = results.filter(review => moment(review.date).isAfter(moment(this.props.fromDateFilterValue).subtract(1,"days").toDate()))
                            // results = results.filter(review => moment(review.date,'DD-MM-YYYY').isAfter(moment(this.props.fromDateFilterValue,'DD-MM-YYYY'),"day"))
                            // // console.log("inside fromDate Filter!")
                            // // console.log("this.props.toDateFilterValue",this.props.toDateFilterValue)
                            // // console.log("isBefore:",moment(this.props.toDateFilterValue).add(1,"days"))
                            // results = results.filter(review => moment(review.date).isBefore(moment(this.props.toDateFilterValue).add(1,"days").toDate()))
                            // results = results.filter(review => moment(review.date).isBefore(moment(this.props.toDateFilterValue),"day"))
                            results = results.filter(review => {
                                // // console.log("review.date", review.date)
                                // // console.log("this.props.toDateFilterValue",this.props.toDateFilterValue)
                                // // console.log("moment(review.date)", moment(review.date,'DD-MM-YYYY'))
                                // // console.log("moment(this.props.toDateFilterValue)",moment(this.props.toDateFilterValue,'DD-MM-YYYY').toDate())
                                // // console.log("moment(review.date).isBefore(moment(this.props.toDateFilterValue),'day')",moment(review.date,'DD-MM-YYYY').isBefore(moment(this.props.toDateFilterValue,'DD-MM-YYYY'),"day"))
                                if(moment(review.date,'DD-MM-YYYY').isAfter(moment(this.props.fromDateFilterValue,'DD-MM-YYYY').subtract(1,"days"),"day")){
                                    return true
                                }
                                return false
                            })
                            // // console.log("results after fromDateFilter", results)
                        }
                        return results.map((data, index) => {
                            return (
                                <tr>
                                    <td class="Sn">{index + 1}</td>
                                    <td class="Date">{data.date}</td>
                                    <td class="Store">{data.store_name}</td>
                                    <td class="Rating">{data.rating}</td>
                                    <td class="Review">{data.comment}</td>
                                    <td class="Reviewer">{data.reviewer}</td>
                                </tr>
                            );
                        });
                    })()}
                </tbody>
            </table>
        );
    }
}

export default class ReviewsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            storeFilterValue: {label: "Acer PS", value: "Acer PS"},
            fromDateFilterValue: new Date(new Date().setDate(today.getDate() - 30)),
            toDateFilterValue: new Date(),
            ratingFilterValue: [{label: 5,value:5}],
            storeOptions: ["Acer PS"],
            reviewsData: [],
        };
        this.setstoreFilterValue = this.setstoreFilterValue.bind(this)
        this.setfromDateFilterValue = this.setfromDateFilterValue.bind(this)
        this.settoDateFilterValue = this.settoDateFilterValue.bind(this)
        this.setratingFilterValue = this.setratingFilterValue.bind(this)
    }

    setstoreFilterValue(storeFilterValue) {
        this.setState({
            storeFilterValue: storeFilterValue
        })
        // console.log("setstoreFilterValue Called!")
    }

    setfromDateFilterValue(fromDateFilterValue) {
        this.setState({
            fromDateFilterValue: fromDateFilterValue
        })
    }

    settoDateFilterValue(toDateFilterValue) {
        this.setState({
            toDateFilterValue: toDateFilterValue
        })
    }

    setratingFilterValue(ratingFilterValue) {
        this.setState({
            ratingFilterValue: ratingFilterValue
        })
        // console.log("setratingFilterValue called! ratingFilterValue:", ratingFilterValue)
        // console.log("this.state.ratingFilterValue", this.state.ratingFilterValue)
    }

    componentDidMount() {
        fetch("https://matrik.pythonanywhere.com/stores/")
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    storeOptions: data
                });
            })
            .catch((err) => {
                // // console.log(err.message);
            });

        fetch("https://matrik.pythonanywhere.com/reviews/", {
            method: 'POST',
            body: JSON.stringify({
                store: [this.state.storeFilterValue.value],
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // this.setState({
                //     reviewsData: data.filter(review => review.rating == this.state.ratingFilterValue).filter(review => review.date <= this.state.toDateFilterValue).filter(review => review.date >= this.state.fromDateFilterValue)
                // });
                this.setState({
                    reviewsData: data
                });

            })
            .catch((err) => {
                // console.log(err.message);
            });
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log("prevState.storeFilterValue",prevState.storeFilterValue)
        // console.log("this.state.storeFilterValue",this.state.storeFilterValue)
        if (prevState.storeFilterValue !== this.state.storeFilterValue) {
            // console.log("this.state.storeFilterValue",this.state.storeFilterValue)
            // console.log("this.state.ratingFilterValue",this.state.ratingFilterValue)
            fetch("https://matrik.pythonanywhere.com/reviews/", {
                method: 'POST',
                body: JSON.stringify({
                    store: [this.state.storeFilterValue.value],
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    // this.setState({
                    //     reviewsData: data.filter(review => review.rating == this.state.ratingFilterValue).filter(review => review.date <= this.state.toDateFilterValue).filter(review => review.date >= this.state.fromDateFilterValue)
                    // });
                    this.setState({
                        reviewsData: data
                    });

                })
                .catch((err) => {
                    // console.log(err.message);
                });
        }
    }

    render() {
        // console.log("ReactSession.get('is_user_authorized')",window.localStorage.getItem("is_user_authorized"))
        if(window.localStorage.getItem("is_user_authorized") == "false"){
        // if (ReactSession.get("is_user_authorized")) {
            return (
              <Auth message="Please login!"/>
            )
          }
          else {
        return (
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    {/* <SpinnerAll/> */}
                    <div className="rowC">
                        <StoreFilter setstoreFilterValue={this.setstoreFilterValue} storeOptions={this.state.storeOptions} />
                        <DateFilter settoDateFilterValue={this.settoDateFilterValue} setfromDateFilterValue={this.setfromDateFilterValue} />
                        <RatingFilter setratingFilterValue={this.setratingFilterValue} />
                    </div>
                    {/* <Spinner storeFilterValue = {this.state.storeFilterValue} /> */}
                    <FilterTable reviewsData={this.state.reviewsData} ratingFilterValue={this.state.ratingFilterValue} fromDateFilterValue={this.state.fromDateFilterValue} toDateFilterValue={this.state.toDateFilterValue} />
                </div>
            </div>

        )}
    }
}

