import React, { Component } from 'react';
import Chart from 'react-apexcharts';

export default class extends Component {
  // handleClick = () => {
  //   console.log(123);

  //   this.setState({
  //     options: {
  //       ...this.state.options,
  //       chart: {
  //         ...this.state.options.chart,
  //         type: 'area'
  //       }
  //     },
  //     changeType: !this.state.changeType
  //   });
  // };

  render() {
    return (
      <>
        <Chart
          options={this.props.options}
          series={this.props.series}
          type={this.props.type}
          width={this.props.width}
          height={this.props.height}
        />
      </>
    );
  }
}
