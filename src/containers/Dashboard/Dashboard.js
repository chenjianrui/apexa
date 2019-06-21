import React, { Component } from 'react';
// import axios from 'axios';
// import Login from '../../components/Login/Login';
// import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
