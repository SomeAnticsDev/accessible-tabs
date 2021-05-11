import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import "./index.scss";
// import { reportWebVitals } from './reportWebVitals';
// const Wrapper = React.StrictMode;
const Wrapper = React.Fragment;

ReactDOM.render(
  <Wrapper>
    <Router>
      <App />
    </Router>
  </Wrapper>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
