import React, { Component } from 'react';
import Devices from '../Devices/Devices';

class Dashboard extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <>
        <Devices />
      </>
    );
  }
}

export default Dashboard;
