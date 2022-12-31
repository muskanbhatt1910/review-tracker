import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import NameFilter from '../../components/table/nameFilter/nameFilter'
import WeekFilter from '../../components/table/weekFilter/weekFilter'
import FilterTable from '../../components/table/table'
import './tableView.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from 'react';

const Spinner = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 8000);
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

export default class TableView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameFilterValue: [],
      weekFilterValue: [],
      storeOptions: [],
      historicalData: [],
      weekList: []
    };
    this.setnameFilterValue = this.setnameFilterValue.bind(this)
    this.setweekFilterValue = this.setweekFilterValue.bind(this)
  }

  setnameFilterValue(nameFilterValue) {
    this.setState({
      nameFilterValue: nameFilterValue
    })
  }

  setweekFilterValue(weekFilterValue) {
    this.setState({
      weekFilterValue: weekFilterValue
    })
  }

  componentDidMount() {
    fetch("https://matrik.pythonanywhere.com/stores/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          storeOptions: [{ label: "All", value: "*" }, ...data]
        });
      })
      .catch((err) => {
        console.log(err.message);
      });

    fetch("https://matrik.pythonanywhere.com/historical_data/")
      .then((response) => response.json())
      .then((data) => {
        const weekList = [...
          new Set(data.map(
            (obj) => {
              return obj.week_number
            })
          )];
        this.setState({
          historicalData: data,
          weekList: weekList
        });

      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  componentDidUpdate() {
    console.log("Table element state updated! weekFilterValue", this.state.weekFilterValue)
  }

  render() {
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Spinner />
            <div className="rowC">
              <NameFilter setnameFilterValue={this.setnameFilterValue} storeOptions={this.state.storeOptions} />
              <WeekFilter setweekFilterValue={this.setweekFilterValue} weekList={this.state.weekList} />
            </div>
            <FilterTable weekFilterValue={this.state.weekFilterValue} nameFilterValue={this.state.nameFilterValue} historicalData={this.state.historicalData} />
          </div>
        </div>
      
    )
  }
}

