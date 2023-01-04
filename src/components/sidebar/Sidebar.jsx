import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='top'>
          <span className='logo'>REVIEW TRACKER</span>
        </div>
        <Navbar expand="lg" bg="light">
            <Container>
              {/* <Navbar.Brand href="#home">Select View:</Navbar.Brand> */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">
                    <Button variant="primary">CHART VIEW</Button>{' '}
                  </Nav.Link>
                  <Nav.Link href="tableview">
                    <Button variant="primary">TABLE VIEW</Button>{' '}
                  </Nav.Link>
                  <Nav.Link href="reviewsview">
                    <Button variant="primary">REVIEWS</Button>{' '}
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        {/* <hr />
        <div className='center'>
          <ul>
            <p className="title">MAIN MENU</p>
            <li>
              <DashboardIcon className='icon' />
              <span>Dashboard</span>
            </li>
            <p className="title">LISTS MENU</p>
            <li>
              <GroupIcon className='icon' />
              <span>Users</span>
            </li>
            <li>
              <Inventory2Icon className='icon' />
              <span>Products</span>
            </li>
            <li>
              <ProductionQuantityLimitsIcon className='icon' />
              <span>Orders</span>
            </li>
            <li>
              <LocalShippingIcon className='icon' />
              <span>Delivery</span>
            </li>
            <p className="title">OTHER MENU</p>
            <li>
              <QueryStatsIcon className='icon' />
              <span>Status</span>
            </li>
            <li>
              <NotificationsIcon className='icon' />
              <span>Notifications</span>
            </li>
            <p className="title">SERVICES</p>
            <li>
              <HealthAndSafetyIcon className='icon' />
              <span>System Health</span>
            </li>
            <li>
              <PsychologyIcon className='icon' />
              <span>Logs</span>
            </li>
            <li>
              <SettingsIcon className='icon' />
              <span>Settings</span>
            </li>
            <p className="title">ACCOUNT</p>
            <li>
              <PersonIcon className='icon' />
              <span>Profile</span>
            </li>
            <li>
              <ExitToAppIcon className='icon' />
              <span>Logout</span>
            </li>
          </ul>
        </div>
        <div className='bottom'>
          <div className='colorOptions'></div>
          <div className='colorOptions'></div>
        </div> */}
    </div>
  )
}

export default Sidebar