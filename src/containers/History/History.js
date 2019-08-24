import React, { Component } from 'react';

class History extends Component {
  componentDidMount() {
    const address = this.props.match.params.address;
    console.log(address);
    console.log(address);
  }
  render() {
    return <div>History</div>;
  }
}

export default History;
