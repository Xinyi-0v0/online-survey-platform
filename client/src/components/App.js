import React, { Component } from "react";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

const Dashboard = <h2>Dashboard</h2>;
const SurveyNew = <h2>SurveyNew</h2>;
const Landing = <h2>Landing</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <main className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={Landing} />
            <Route path="/surveys">
              <Route index element={Dashboard} />
              <Route path="new" element={SurveyNew} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    );
  }
}

export default connect(null, actions)(App);
