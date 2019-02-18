import React, { Component } from "react";
import "./App.css";
import CustomersList from "./CustomersList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Customers List</h1>
        <CustomersList />
      </div>
    );
  }
}

export default App;
