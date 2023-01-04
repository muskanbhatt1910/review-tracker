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


class DateFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: new Date(),
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
            <div>
                <DatePicker
                    selected={this.state.toDate}
                    onChange={this.handleChangeTodate}
                    isClearable
                    placeholderText="Select End Date"
                />
                <DatePicker
                    selected={this.state.fromDate}
                    onChange={this.handleChangeFromdate}
                    isClearable
                    placeholderText="Select Start Date"
                />
            </div>
        );
    }
}

class StoreFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            storeSelected: "Acer PS"
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
                        defaultValue="Acer PS"
                        value={this.state.storeSelected}
                        placeholder="Select Store"
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
            ratingSelected: 5,
            ratingOptions: [
                { label: 5, value: 5 },
                { label: 4, value: 4 },
                { label: 3, value: 3 },
                { label: 2, value: 2 },
                { label: 1, value: 1 }
            ]
        };
    }

    handleChange = (value) => {
        this.setState({
            ratingSelected: value
        });
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
                    <ReactSelect
                        options={this.state.ratingOptions}
                        onChange={this.handleChange}
                        defaultValue={5}
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
                        console.log("FIlterTable called: this.props.reviewsData",this.props.reviewsData)
                        let results = this.props.reviewsData.filter(review => review.rating == this.props.ratingFilterValue)
                        return results.map((data, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{data.date}</td>
                                    <td>{data.store_name}</td>
                                    <td>{data.rating}</td>
                                    <td>{data.comment}</td>
                                    <td>{data.reviewer}</td>
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
            fromDateFilterValue: new Date(),
            toDateFilterValue: new Date(),
            ratingFilterValue: 5,
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
        console.log("setstoreFilterValue Called!")
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
            ratingFilterValue: ratingFilterValue.value
        })
        console.log("setratingFilterValue called! ratingFilterValue:", ratingFilterValue)
        console.log("this.state.ratingFilterValue", this.state.ratingFilterValue)
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
                // console.log(err.message);
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
                console.log(err.message);
            });
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("prevState.storeFilterValue",prevState.storeFilterValue)
        console.log("this.state.storeFilterValue",this.state.storeFilterValue)
        if (prevState.storeFilterValue !== this.state.storeFilterValue) {
            console.log("this.state.storeFilterValue",this.state.storeFilterValue)
            console.log("this.state.ratingFilterValue",this.state.ratingFilterValue)
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
                    console.log(err.message);
                });
        }
    }

    render() {
        return (
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    <SpinnerAll/>
                    <div className="rowC">
                        <StoreFilter setstoreFilterValue={this.setstoreFilterValue} storeOptions={this.state.storeOptions} />
                        {/* <DateFilter settoDateFilterValue={this.settoDateFilterValue} setfromDateFilterValue={this.setfromDateFilterValue} /> */}
                        <RatingFilter setratingFilterValue={this.setratingFilterValue} />
                    </div>
                    <Spinner storeFilterValue = {this.state.storeFilterValue} />
                    <FilterTable reviewsData={this.state.reviewsData} ratingFilterValue={this.state.ratingFilterValue} />
                </div>
            </div>

        )
    }
}

