import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import "./assets/css/registration.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>{routes}</Router>
      </div>
    );
  }
}
