import './chart.scss'
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import React, { Component } from "react";
import FilteredData from '../filter/filter';
import { getByLabelText } from '@testing-library/react';


function getLabel(label){
  const dict = {
    "total_rating": "Total Rating",
    "total_reviews": "Total Reviews",
    "avg_rating_week": "Weekly Average Rating",
    "total_reviews_week": "New Reviews per week"
  }
  return dict[label]
}


// const data = [
//   { name: 'January', total: 1200 },
//   { name: 'February', total: 3000 },
//   { name: 'March', total: 1002 },
//   { name: 'April', total: 900 },
//   { name: 'May', total: 500 },
//   { name: 'June', total: 3200 },
//   { name: 'July', total: 1200 },
 
// ];

// const Chart = () => {
//   return (
//     <div className='chart'>
//       <div className="title">Last 6 Months Revenue</div>
//         <ResponsiveContainer width="100%"  aspect={3/1}>
//         <AreaChart width={'100%'} height={250} data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
//             <defs>
//               <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
//                 <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
//               </linearGradient>
//             </defs>
//             <XAxis dataKey="name" />
//             <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
//             <Tooltip />
//             <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />     
//         </AreaChart>                 
//       </ResponsiveContainer>
//     </div>
//   )
// }

// export default Chart

const data = [
  { week_number: 47, total: 1200},
  { week_number: 49, total: 1900}
  // {week_number: 3, total: 120},
  // {week_number: 4, total: 500}
];
// const data = [
//   { name: 'January', total: 1200 },
//   { name: 'February', total: 3000 },
//   { name: 'March', total: 1002 },
//   { name: 'April', total: 900 },
//   { name: 'May', total: 500 },
//   { name: 'June', total: 3200 },
//   { name: 'July', total: 1200 },

// ];

export function SetSelectedTab(tab) {
  this.setState({
    selectedTab: tab
  });
  console.log("setSelectedTab called!")
  this.state.selectedTab = tab
  console.log("SetSelectedTab function called, selectedTab: ",this.state.selectedTab)
  // this.forceUpdate()
  // console.log("chart updated, selectedTab", this.state.selectedTab)
};

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pariDataChart: [
        { store_name: "", week_number: "", total_rating: "", avg_rating_week: "", total_reviews: "" }, //total_reviews_week
      ],
      chartData: [],
      dataInitial: [],
      selectedTab: "total_rating"
    }
    SetSelectedTab = SetSelectedTab.bind(this)
  }
  //function that takes selected stores and filters pariDataChart
  filterChartData = (selectedStores) => {
    // var temp = {...this.state.pariDataChart}
    var temp = JSON.parse(JSON.stringify(this.state.pariDataChart))
    console.log("temp: ",temp)
    temp = temp.filter(o => selectedStores.includes(o.store_name))
    console.log("filterChartData selectedStores", selectedStores)
    console.log("filterChartData selectedStores temp:", temp)

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
      if(obj.total_reviews != 0){
        obj.total_rating = obj.total_rating / obj.total_reviews
      }
      if(obj.total_reviews_week != 0){
        obj.avg_rating_week = obj.avg_rating_week / obj.total_reviews_week
      }
    })

    console.log("chart data:", chart_data)
    chart_data = chart_data.sort((a, b) => a.week_number - b.week_number)
    return chart_data
    // return chart_data
  }


  componentDidMount() {
    console.log("chart mounted")
    fetch("https://matrik.pythonanywhere.com/historical_data/" )
      .then((response) => response.json())
      .then((data) => {
        let results = []
        data.forEach((row, index) => {
          let row_data = row;
          // row_data["total_reviews_week"] = 10;
          results.push(row_data)
        })
        this.setState({
          pariDataChart: results
        });
        this.setState({
          chartData: this.filterChartData(this.props.selectedStores)
        });
        console.log("chartData:", this.state.chartData)
      })
      .catch((err) => {
        console.log(err.message);
        console.log("Error in fetching hist. data!")
      });
  }

  componentDidUpdate(prevProps,prevState) {
    console.log("chart updated!")
    if (prevProps.selectedStores !== this.props.selectedStores) {
      // console.log("if entered this.componentDidUpdate")
      // console.log("this.props.selectedStores",this.props.selectedStores)
      // console.log("this.filterChartData(this.props.selectedStores)",this.filterChartData(this.props.selectedStores))
      this.setState({
        chartData: this.filterChartData(this.props.selectedStores)
      });
    }
    
    // console.log("chartData2:", this.state.chartData)
  }

  render() {
    return (
      <div className='chart'>
        {/* <div className="title">{getLabel(this.state.selectedTab)}</div> */}
        <div className="title">{(()=>{
          // console.log("Chart Rerendered:", this.state.selectedTab)
          return getLabel(this.props.tabSel)
        })()}</div>
        <ResponsiveContainer width="100%" aspect={3 / 1}>
          {/* <AreaChart width={'100%'} height={250} data={this.state.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="total_rating" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              </defs>
              <XAxis dataKey="week_number" />
              <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
              <Tooltip />
              <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
          </AreaChart>                  */}
          <LineChart width={500} height={300} data={this.state.chartData} >
            <XAxis dataKey="week_number" label={{value: 'Week Number', dy:10}} />
            <YAxis domain={(() => {
              if(this.props.tabSel == "total_rating" || this.props.tabSel == "avg_rating_week") {
                return [0,5]
              }
              else{
                return [0,'auto']
              }
            })()}
            tickCount={(() => {
              if(this.props.tabSel == "total_rating" || this.props.tabSel == "avg_rating_week") {
                return 6
              }
            })()}
            />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line 
              type="monotone" 
              // dataKey={(() => {
              //   console.log("LineChart rerendered, selectedTab: ", this.state.selectedTab)
              //   return this.state.selectedTab
              // })()} 
              dataKey={this.props.tabSel}
              stroke="#8884d8" 
            />
            <Tooltip 
              formatter={function(value,name) {
                return `${value}`;
              }}
              labelFormatter={function(value) {
                return `Week: ${value}`;
              }}
              
            />
            {/* <Line type="monotone" dataKey="total_reviews" stroke="#82ca9d" /> */}
            {/* <Line type="monotone" dataKey="avg_rating_week" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
