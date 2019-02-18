import React, { Component } from "react";
import ReactTable from "react-table";
import { Input, Row, Col, Card, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

import "react-table/react-table.css";
import "./CustomersList.css";

import { getAll, search } from "./server";

class CustomersList extends Component {
  state = {
    customers: [],
    firstName: "",
    lastName: "",
    email: "",
    ipAddress: ""
  };

  componentDidMount() {
    getAll()
      .then(response => {
        this.setState({ customers: response.data });
      })
      .catch(error => console.log("Error in getAll"));
  }

  handleChange = evt => {
    const name = evt.target.name;
    this.setState({ [name]: evt.target.value });
  };

  searchClicked = () => {
    const { firstName, lastName, email, ipAddress } = this.state;
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      ipAddress: ipAddress
    };

    search(payload)
      .then(response => {
        console.log("RESPONSE", response);
        if (response.data) this.setState({ customers: response.data });
      })
      .catch(error => console.log("ERROR IN SEARCH"));
  };

  render() {
    const columns = [
      {
        Header: "First Name",
        accessor: "first_name" // String-based value accessors!
      },
      {
        Header: "Last Name",
        accessor: "last_name"
        // Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: "Email",
        accessor: "email" // String-based value accessors!
      },
      {
        Header: "IP Address",
        accessor: "ip" // String-based value accessors!
      }
    ];

    return (
      <Card className="CustomersList">
        <Card className="myCard">
          <Row className="myRow">
            <h2>Enter search criteria below:</h2>
          </Row>
          <Row>
            <Col lg="2">
              <Input
                className="myInput"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleChange}
                type="text"
                name="firstName"
              />
            </Col>
            <Col lg="2">
              <Input
                className="myInput"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleChange}
                type="text"
                name="lastName"
              />
            </Col>{" "}
            <Col lg="3">
              <Input
                className="myInput"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                type="text"
                name="email"
              />
            </Col>{" "}
            <Col lg="3">
              <Input
                className="myInput"
                placeholder="IP Address"
                value={this.state.ipAddress}
                onChange={this.handleChange}
                type="text"
                name="ipAddress"
              />
            </Col>
            <Col lg="2" style={{ marginTop: ".25em" }}>
              <Button
                style={{ width: "100%" }}
                size="sm"
                color="primary"
                onClick={this.searchClicked}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Card>
        <hr style={{ border: "1px solid #61dafb" }} />
        <Card>
          <ReactTable
            data={this.state.customers}
            columns={columns}
            defaultSorted={[{ id: "last_name", desc: false }]}
            defaultPageSize={10}
            minRows={0}
          />
        </Card>
      </Card>
    );
  }
}

export default CustomersList;
