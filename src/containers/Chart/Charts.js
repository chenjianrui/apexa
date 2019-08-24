import React, { Component } from 'react';
import Chart from 'chart.js';

class Charts extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    this.Chart = new Chart(this.canvasRef.current, {
      type: 'bar',
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: 12,
                fontFamily: 'Gotham-Medium',
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 10,
                stepSize: 0.2,
                padding: 10,
                callback(value, index) {
                  return value % 2 === 0 ? '' : value;
                }
              }
              // gridLines: {
              //   tickMarkLength: 40,
              //   offsetGridLines: true,
              //   display: true,
              //   drawTicks: false,
              //   drawOnChartArea: false
              // }
            }
          ]
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
              speed: 10,
              threshold: 10
            },
            zoom: {
              enabled: true,
              mode: 'y'
            }
          }
        }
      },
      data: {
        labels: this.props.data.labels.map(label => label),
        datasets: [
          {
            label: this.props.data.title,
            data: this.props.data.data.map(data => data),
            backgroundColor: this.props.data.colors.map(color => color)
          }
        ]
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading !== this.props.loading) {
      this.Chart.data.labels = this.props.data.labels.map(label => label);
      this.Chart.data.datasets[0].data = this.props.data.data.map(data => data);
      this.Chart.data.datasets[0].backgroundColor = this.props.data.colors.map(
        color => color
      );
      this.Chart.update();
    }
  }

  // 讓選日期和按搜尋時圖表不會重新渲染
  shouldComponentUpdate(nextProps) {
    return nextProps.loading !== this.props.loading && this.props.loading;
  }

  componentWillUnmount() {
    this.Chart.data.labels = [];
    this.Chart.data.datasets[0].data = [];
    this.Chart.data.datasets[0].backgroundColor = [];
    this.Chart.update();
  }
  render() {
    console.log(this.props);
    return (
      <div className="chart-wrapper">
        <canvas ref={this.canvasRef} />
      </div>
    );
  }
}

export default Charts;
