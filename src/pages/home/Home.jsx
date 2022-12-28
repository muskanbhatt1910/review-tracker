import './home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import Feature from '../../components/feature/Feature'
import Chart from '../../components/chart/Chart'
import FilteredData from '../../components/filter/filter'

const Home = () => {
  return (
    <div className="home">
      
        <Sidebar />
        <div className="homeContainer">
          <div className="charts">
            <FilteredData />
            {/* <Feature /> */}
          </div>
          {/* <div className="charts">
            <Chart />
          </div> */}
        </div>
    </div>
  )
}

export default Home