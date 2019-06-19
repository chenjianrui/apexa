import React, { Component } from 'react';
// import axios from 'axios';
// import Login from '../../components/Login/Login';
// import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      this.props.history.push('/login');
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className={this.props.className}>
        <h1>Dashboard</h1>
        <button onClick={this.props.clicked}>Logout</button>
      </div>
    );
  }
}

export default Dashboard;
