import './home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
// import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import Feature from '../../components/feature/Feature'
import Chart from '../../components/chart/Chart'
import FilteredData from '../../components/filter/filter'
import TableView from '../tableView/TableView'
import { ReactSession } from 'react-client-session';
import Auth from '../auth/auth'


const Home = () => {
  console.log("ReactSession.get('is_user_authorized')", window.localStorage.getItem("is_user_authorized"))
  if (window.localStorage.getItem("is_user_authorized") == "false") {
    console.log("Imma entered")
    // if (ReactSession.get("is_user_authorized")) {
    return (
      <Auth message="Please login!" />
    )
  }
  else {
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <div className="charts">
            <FilteredData />
            {/* <Feature /> */}
            {/* <TableView /> */}
          </div>
          {/* <div className="charts">
            <Chart />
          </div> */}
        </div>
      </div>
    )
  }
}

export default Home