import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import React, { useState, useEffect } from 'react';
import { Component } from "react";
import { components } from "react-select";
import { SetSelectedTab } from "../chart/Chart.jsx";
import { setTabSel } from '../filter/filter';
import Chart from '../chart/Chart.jsx';

export function globalFilterChartData(selectedStores, pariData) {

    // console.log("Imma called here!")

    let temp = JSON.parse(JSON.stringify(pariData))
    // console.log("temp: ", temp)
    temp = temp.filter(o => selectedStores.includes(o.store_name))
    // console.log("filterChartData selectedStores", selectedStores)
    // console.log("filterChartData selectedStores temp:", temp)

    // const data = [
    //   { week_number: '1',total_rating: '4.5', avg_rating_week: '3.9', total_reviews: '350', total_reviews_week: '10' },
    //   {},
    //   ...
    // ]

    let weeks_list = []
    let chart_data = []

    temp.forEach((row, index) => {
        if (weeks_list.includes(row.week_number)) {
            chart_data.map(obj => {
                if (obj.week_number == row.week_number) {
                    obj.total_reviews = obj.total_reviews + row.total_reviews
                    obj.total_reviews_week = obj.total_reviews_week + row.total_reviews_week
                    obj.total_rating = obj.total_rating + row.total_rating * row.total_reviews //stores (total rating x total reviews)
                    obj.avg_rating_week = obj.avg_rating_week + row.avg_rating_week * row.total_reviews_week

                }
                return obj
            })
        }
        else {
            weeks_list.push(row.week_number)
            let obj = row
            // delete obj.store_name
            obj.total_rating = obj.total_rating * obj.total_reviews
            obj.avg_rating_week = obj.avg_rating_week * obj.total_reviews_week
            chart_data.push(obj)
        }
    })

    chart_data.map((obj) => {
        if (obj.total_reviews != 0) {
            obj.total_rating = obj.total_rating / obj.total_reviews
        }
        if (obj.total_reviews_week != 0) {
            obj.avg_rating_week = obj.avg_rating_week / obj.total_reviews_week
        }
    })

    // console.log("chart data:globalFilterChartData ", chart_data)
    chart_data = chart_data.sort((a, b) => a.week_number - b.week_number)
    return chart_data

}


export default class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewDetails: [
                // { value: "", label: "" },
                {title: 'Total Rating', value: '0', diff: '0', id: 'total_rating'},
            ],
            myTab: "total_rating",
            pariData: [],
            percentageData: {
                "total_rating": 0,
                "total_reviews": 0,
                "avg_rating_week": 0,
                "total_reviews_week": 0
            }
        }
    }

    getPercentageData = (selectedStores) => {
        // console.log("Unlucky me!")
        let chart_data = globalFilterChartData(selectedStores, this.state.pariData)
        // console.log("chart_data: ", chart_data)
        chart_data = chart_data.sort((a, b) => b.week_number - a.week_number)
        let tempPercentageData = {
            "total_rating": 0,
            "total_reviews": 0,
            "avg_rating_week": 0,
            "total_reviews_week": 0
        }
        // console.log("tempPercentageData",tempPercentageData)
        if(chart_data.length>=2){
            // console.log("chart_data.length>=2")
            // console.log("chart_data:****", chart_data)
            tempPercentageData = {
                "total_rating": ((chart_data[0].total_rating-chart_data[1].total_rating)/chart_data[1].total_rating)*100,
                "total_reviews": ((chart_data[0].total_reviews-chart_data[1].total_reviews)/chart_data[1].total_reviews)*100,
                "avg_rating_week": ((chart_data[0].avg_rating_week-chart_data[1].avg_rating_week)/chart_data[1].avg_rating_week)*100,
                "total_reviews_week": ((chart_data[0].total_reviews_week-chart_data[1].total_reviews_week)/chart_data[1].total_reviews_week)*100
            }
            // console.log("tempPercentageData&&&&&",tempPercentageData)
            // this.setState({
            //     percentageData: tempPercentageData
            // });
            Object.keys(tempPercentageData).forEach((key1) => {
                if(!tempPercentageData[key1]){
                    tempPercentageData[key1] = 0
                }
            });
            // console.log("Lucky me!")
        }    
        return tempPercentageData    
    }
    

    componentDidMount() {
        // console.log("componenetDidMount():", this.props.selectedStores)
        fetch("https://matrik.pythonanywhere.com/widget/", {
            method: 'POST',
            body: JSON.stringify({
                selectedStores: this.props.selectedStores,
                // selectedStores: ['Acer PS','Acer TR'],
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    reviewDetails: data
                });

            })
            .catch((err) => {
                // console.log(err.message);
            });

        fetch("https://matrik.pythonanywhere.com/historical_data/")
            .then((response) => response.json())
            .then((data) => {
                let results = []
                data.forEach((row, index) => {
                    let row_data = row;
                    // row_data["total_reviews_week"] = 10;
                    results.push(row_data)
                })
                this.setState({
                    pariData: results
                });
                this.setState({
                    percentageData: this.getPercentageData(this.props.selectedStores)
                });
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedStores !== this.props.selectedStores) {
            // console.log("componenetDidUpdate(): if called", this.props.selectedStores)
            fetch("https://matrik.pythonanywhere.com/widget/", {
                method: 'POST',
                body: JSON.stringify({
                    selectedStores: this.props.selectedStores,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    this.setState({
                        reviewDetails: data
                    });
                    this.setState({
                        percentageData: this.getPercentageData(this.props.selectedStores)
                    });
                })
                .catch((err) => {
                    // console.log(err.message);
                    // console.log("widget not working")
                });
        }
        else {
            // console.log("componenetDidUpdate(): else called", this.props.selectedStores)
        }
    }

    handleClick = (tab) => {
        // // console.log("Mouse Enter",id)
        // // console.log("onMouseEnter Tab: ", tab)        
        // SetSelectedTab(tab)
        // // console.log("func called")
        // setTabSel(tab)
        this.setState({
            myTab: tab
        });
    }
    outHandler = () => {
        // console.log("onMouseLeave")
    }
    render() {

        return (
            <div>
                <div className='widgets'>
                    {this.state.reviewDetails.map((detail) => {
                        return (


                            <div className={this.state.myTab === detail.id ? 'widgetActive' : 'widget'}
                                // <div className='widget'

                                onClick={() => {
                                    // console.log("Muskan")
                                    // console.log("detail id", detail.id)
                                    this.handleClick(detail.id)
                                }}
                                onMouseEnter
                                onMouseLeave={this.outHandler}
                            >
                                <div className='left'>
                                </div>
                                <div className='center'>
                                    <span className='title'>{detail.title}</span>
                                    <span className='counter'>{detail.value}</span>
                                    {/* <span className='link'>{data.link}</span> */}
                                    {this.state.percentageData[detail.id] >= 0 ?
                                        <div className="percentage positive">
                                            <KeyboardArrowUpIcon />
                                            {this.state.percentageData[detail.id].toFixed(2)}% this week
                                            {/* {detail.diff}% this week */}
                                        </div>
                                    :
                                        <div className="percentage negative">
                                            <KeyboardArrowDownIcon />
                                            {-1*(this.state.percentageData[detail.id].toFixed(2))}% this week
                                            {/* {detail.diff}% this week */}
                                        </div>
                                    }
                                    
                                </div>
                                <div className='right'>
                                </div>
                            </div>

                        );
                    })}
                </div>
                <div>
                    <Chart tabSel={this.state.myTab} selectedStores={this.props.selectedStores} />
                </div>
            </div>
        );
    }
}