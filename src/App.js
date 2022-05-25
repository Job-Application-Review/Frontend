import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/home";
import Sutton from "./component/Button/Button";
import AdminView from "./component/AdminView/AdminView";
import { Button } from "antd";
import TableShow from "./component/Table/Table";
import Api from "./component/Api/Api";
import AdminApi from "./component/AdminApi/AdminApi";
import Detail from "./component/Details/Details";
import Apply from "./component/Apply/Apply";
import PortalLayout from "./component/PortalLayout/PortalLayout";
import ApplicationDetail from "./component/ApplicationDetail/ApplicationDetail";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <ul>
          <li>
            <Link to="/">To Home</Link>
          </li>
          <li>
            <Link to="/button">To Profile</Link>
          </li>
          <li>
            <Link to="/row" exact>
              To Andrew's Profile
            </Link>
          </li>
          <li>
            <Link to="/feed">To Feed</Link>
          </li>
        </ul> */}
        <Routes>
          <Route exact path="/" element={<Header />}></Route>
          {/* <Route exact path="/view-application" element={<Sutton />}></Route> */}
          <Route exact path="/apply" element={<Apply />}></Route>
          <Route
            exact
            path="/view-application"
            element={<PortalLayout ContentComp={<Detail />} />}
          ></Route>
          <Route
            exact
            path="/admin-view-application"
            element={<PortalLayout ContentComp={<AdminApi />} />}
          ></Route>
          <Route
            exact
            path="/application-detail"
            element={
              <PortalLayout
                ContentComp={
                  <ApplicationDetail url="http://127.0.0.1:8000/application-detail/5/" />
                }
              />
            }
          ></Route>

          <Route exact path="/test1" element={<TableShow />}></Route>
          <Route exact path="/test2" element={<Api />}></Route>
          {/* <Route path="/row" component={Row} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
