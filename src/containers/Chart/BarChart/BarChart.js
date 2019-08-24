import React, { Component } from 'react';
import Chart from 'chart.js';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      data: this.getRandomArray(1500)
    };
  }
  componentDidMount() {
    this.Chart = new Chart(this.canvasRef.current, {
      type: 'bar',
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100
              }
            }
          ]
        }
      },
      data: {
        labels: this.state.data.map(d => d.label),
        datasets: [
          {
            label: 'PM25',
            data: this.state.data.map(d => d.value),
            backgroundColor: ['red', 'blue']
          }
        ]
      }
    });
  }

  getRandomArray(numItems) {
    // Create random array of objects
    let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let data = [];
    for (var i = 0; i < numItems; i++) {
      data.push({
        label: names[i],
        value: Math.round(20 + 80 * Math.random())
      });
    }
    return data;
  }
  render() {
    return (
      <canvas ref={this.canvasRef} style={{ width: '100%', height: '400px' }} />
    );
  }
}

export default BarChart;
