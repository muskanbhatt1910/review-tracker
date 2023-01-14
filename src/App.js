import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/home/Home";
import Auth from "./pages/auth/auth";
import TableView from "./pages/tableView/TableView";
import ReviewsView from "./pages/reviewsView/ReviewsView";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import DateSelector from './components/reviews/reviews';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Auth />} />
            <Route path="tableview">
              <Route index element={<TableView />} />
            </Route>
            <Route path="home">
              <Route index element={<Home />} />
            </Route>
            <Route path="reviewsview">
              <Route index element={<ReviewsView />} />
            </Route>
            {/* <Route path="tableview" element={<TableView />} /> */}
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
