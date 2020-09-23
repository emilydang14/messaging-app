import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import classes from "./App.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import MessageSection from "../components/MessageSection/MessageSection";
import Login from "../components/Login/Login";
import { useStateValue } from "../StateProvider";

const d = new Date();
const currentYear = d.getFullYear();

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className={classes.App}>
      {!user ? (
        <Login />
      ) : (
        <div className={classes.appBody}>
          <div className={classes.appBodyOverlay}>
            <Router>
              <Sidebar />
              <Switch>
                <Route exact path="/rooms/:roomId">
                  <MessageSection />
                </Route>
                {/* <Route path="/">
                  <MessageSection />
                </Route> */}
                <Redirect to="/" />
              </Switch>
            </Router>
          </div>
        </div>
      )}

      <div className={classes.copyright}>
        Copyright © Emily Dang {currentYear}
      </div>
    </div>
  );
}

export default App;
