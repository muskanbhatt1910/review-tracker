import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import './table.scss'

export default class FilterTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: this.props.historicalData,
      nameFilterValue: this.props.nameFilterValue,
      weekFilterValue: this.props.weekFilterValue
    };
  }

  getWeeks = (weekFilterValue) => {
    let weeks = []
    if (weekFilterValue) {
      weeks.push(weekFilterValue.value)
    }
    return weeks
  };

  getStores = (nameFilterValue) => {
    // // console.log("nameFilterValue", nameFilterValue)
    let stores = []
    nameFilterValue.forEach((store) => {
      stores.push(store.value)
    })
    return stores
  };

  componentDidUpdate(prevProps,prevState){
    if(prevState.nameFilterValue !== this.state.nameFilterValue){
      this.setState({
        nameFilterValue: this.props.nameFilterValue,
        weekFilterValue: this.props.weekFilterValue
      });
    }
    else if(prevState.weekFilterValue !== this.state.weekFilterValue){
      this.setState({
        nameFilterValue: this.props.nameFilterValue,
        weekFilterValue: this.props.weekFilterValue
      });
    }
    
  }

  render() {
    return (
      <table className="table-week">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Week</th>
            <th>Store</th>
            <th>Rating for the week</th>
            <th>New reviews in the week</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
          <td>Muskan</td>
                  <td>a</td>
                  <td>b</td>
                  <td>c</td>
                  <td>d</td>
                  <td>e</td>
          </tr>
          {
            (()=>{
              const dataset = this.props.historicalData
              dataset.forEach(data => {
                <tr>
                    <td>1</td>
                    <td>{data.week_number}</td>
                    <td>{data.store_name}</td>
                    <td>{data.avg_rating_week}</td>
                    <td>{data.total_reviews_week}</td>
                  </tr>
              });
            }
            )()
          }
          { (() => {
            // // console.log("Table created!, data passed = ", this.props.historicalData)
            // // // console.log("this.props.weekFilterValue",this.props.weekFilterValue)
            // let weeks = this.props.weekFilterValue.map((week) => week.value);
            // // console.log("this.props.nameFilterValue",this.props.nameFilterValue)
            let stores = this.props.nameFilterValue.map((store) => store.value);
            // // console.log("stores",stores)
            // .filter(row => weeks.includes(row.week_number))
            // filter(row => stores.includes(row.store_name)).
            const dataset = this.props.historicalData
            dataset.forEach((data) => {
              return (
              <tr>
                  <td>1</td>
                  <td>{data.week_number}</td>
                  <td>{data.store_name}</td>
                  <td>{data.avg_rating_week}</td>
                  <td>{data.total_reviews_week}</td>
                </tr>
              )
            });
            this.props.historicalData.map((data, index) => {
              return (
                <tr>
                  <td>Muskan</td>
                  <td>{index + 1}</td>
                  <td>{data.week_number}</td>
                  <td>{data.store_name}</td>
                  <td>{data.avg_rating_week}</td>
                  <td>{data.total_reviews_week}</td>
                </tr>
              )
            })
          })() } */}
          {/* {(()=>{
            // // console.log("I am called here!")
            // // console.log("this.props.nameFilterValue",this.props.nameFilterValue)
            // // console.log("this.props.weekFilterValue",this.props.weekFilterValue)
            if((!this.props.nameFilterValue || this.props.nameFilterValue.length<=0) && (!this.props.weekFilterValue || this.props.weekFilterValue.length <=0)){
              // // console.log("Entered here!")
              // // console.log("historicalData", this.props.historicalData)
              this.props.historicalData.map((data,index) => {
                return (
                  <tr>
                      <td>{index + 1}</td>
                      <td>{data.week_number}</td>
                      <td>{data.store_name}</td>
                      <td>{data.avg_rating_week.toFixed(2)}</td>
                      <td>{data.total_reviews_week}</td>
                    </tr>
                );
              })
            }
            else{
              this.props.historicalData.filter(row => this.getStores(this.props.nameFilterValue).includes(row.store_name)).filter(row => this.getWeeks(this.props.weekFilterValue).includes(row.week_number)).map((data,index) => {
                return (
                  <tr>
                      <td>{index + 1}</td>
                      <td>{data.week_number}</td>
                      <td>{data.store_name}</td>
                      <td>{data.avg_rating_week.toFixed(2)}</td>
                      <td>{data.total_reviews_week}</td>
                    </tr>
                );
              })
            }
          })()} */}
          {/* {this.props.historicalData.filter(row => this.getStores(this.props.nameFilterValue).includes(row.store_name)).filter(row => this.getWeeks(this.props.weekFilterValue).includes(row.week_number)).map((data,index) => {
            return (
              <tr>
                  <td>{index + 1}</td>
                  <td>{data.week_number}</td>
                  <td>{data.store_name}</td>
                  <td>{data.avg_rating_week.toFixed(2)}</td>
                  <td>{data.total_reviews_week}</td>
                </tr>
            );
          })} */}
          {(() => {
            // // // console.log("Table rerendered")
            // // // console.log("this.props.nameFilterValue",this.props.nameFilterValue)
            // // // console.log("this.props.nameFilterValue.length",this.props.nameFilterValue.length)
            // // // console.log("this.props.weekFilterValue",this.props.weekFilterValue)
            // // console.log("this.props.weekFilterValue.length",this.props.weekFilterValue.length)
            let results = this.props.historicalData
            if (this.props.nameFilterValue && this.props.nameFilterValue.length > 0) {
              results = results.filter(row => this.getStores(this.props.nameFilterValue).includes(row.store_name));
            }
            // // console.log("this.props.weekFilterValue",this.props.weekFilterValue)
            if (this.props.weekFilterValue && !Array.isArray(this.props.weekFilterValue) && this.props.weekFilterValue.value !== "*") {
                results = results.filter(row => this.getWeeks(this.props.weekFilterValue).includes(row.week_number));
            }
            
            return results.map((data, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{data.week_number}</td>
                  <td>{data.store_name}</td>
                  <td>{data.avg_rating_week}</td>
                  <td>{data.total_reviews_week}</td>
                </tr>
              );
              });

            // if (this.props.nameFilterValue && this.props.nameFilterValue.length > 0 && this.props.weekFilterValue) {
            //   // // console.log("if called!")
            //   const ans = this.props.historicalData.filter(row => this.getStores(this.props.nameFilterValue).includes(row.store_name)).filter(row => this.getWeeks(this.props.weekFilterValue).includes(row.week_number)).map((data, index) => {
            //     return (
            //       <tr>
            //         <td>{index + 1}</td>
            //         <td>{data.week_number}</td>
            //         <td>{data.store_name}</td>
            //         <td>{data.avg_rating_week.toFixed(2)}</td>
            //         <td>{data.total_reviews_week}</td>
            //       </tr>
            //     );
            //   })
            //   return ans
            // }
            // else {
            //   // // console.log("else called!")
            //   let ans2 = this.props.historicalData.map((data, index) => {
            //     return (
            //       <tr>
            //         <td>{index + 1}</td>
            //         <td>{data.week_number}</td>
            //         <td>{data.store_name}</td>
            //         <td>{data.avg_rating_week.toFixed(2)}</td>
            //         <td>{data.total_reviews_week}</td>
            //       </tr>
            //     );
            //   })
            //   // // console.log("ans2", ans2)
            //   return ans2
            // }
          })()}
          {/* {this.props.historicalData.map((data,index) => {
            return (
              <tr>
                  <td>{index + 1}</td>
                  <td>{data.week_number}</td>
                  <td>{data.store_name}</td>
                  <td>{data.avg_rating_week.toFixed(2)}</td>
                  <td>{data.total_reviews_week}</td>
                </tr>
            );
          })} */}
        </tbody>
      </table>
    )
  }
}