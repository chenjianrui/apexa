import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import Chart from './components/Chart';
import Switch from '@material-ui/core/Switch';

class App extends Component {
  state = {
    options: {
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
          columnWidth: '35%',
          barHeight: '50%',
          distributed: false,
          colors: {
            ranges: [
              {
                from: 0,
                to: 0,
                color: undefined
              }
            ],
            backgroundBarColors: [],
            backgroundBarOpacity: 1
          },
          dataLabels: {
            position: 'top',
            maxItems: 100,
            hideOverflowingLabels: true
          }
        }
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function(val, opts) {
          return val;
        },
        textAnchor: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '0px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          colors: undefined
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          opacity: 0.45
        }
      },
      chart: {
        id: 'apexchart-example',
        type: 'bar',
        height: 320,
        width: '100%'
      },
      theme: {
        mode: 'light'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      },
      colors: [
        function({ value, seriesIndex, w }) {
          if (value <= 15) {
            return '#48cfae';
          } else if (value >= 16 && value <= 35) {
            return '#fdbe39';
          } else if (value >= 36 && value <= 54) {
            return '#fd8f3c';
          } else if (value >= 55 && value <= 150) {
            return '#ea4c3f';
          } else if (value >= 151 && value <= 250) {
            return '#c20f00';
          } else if (value >= 251 && value <= 500) {
            return '#ab2b82';
          } else {
            return '#ab2b82';
          }
        }
      ]
    },
    series: [
      {
        name: 'series-1',
        data: [15, 54, 150, 250, 500, 11, 56, 250]
      }
    ],
    changeType: false,
    modeType: false
  };
  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      options: {
        ...this.state.options,
        chart: {
          ...this.state.options.chart,
          type: e.target.value
        }
      }
    });
  };
  // 暗黑 mode
  handleChangeMode = name => event => {
    this.setState(
      {
        ...this.state.modeType,
        [name]: event.target.checked
      },
      () => {
        this.setState({
          options: {
            ...this.state.options,
            theme: {
              ...this.state.options.theme,
              mode: this.state.modeType ? 'dark' : 'light'
            }
          }
        });
      }
    );
  };

  render() {
    const { options, series, width, height } = this.state;
    const data = [
      [30, 40, 45, 50, 49, 60, 70, 91],
      [15, 54, 150, 250, 500, 11, 56, 250]
    ];
    let chart = data.map((item, index) => {
      return (
        <>
          <Chart
            options={options}
            series={[
              {
                name: index,
                data: item
              }
            ]}
            width={width}
            height={height}
            type={this.state.options.chart.type}
          />
        </>
      );
    });
    return (
      <div>
        <NavBar onSelect={this.handleSelect} />

        {chart}

        <select onChange={this.handleChange}>
          <option value="area">area</option>
          <option value="bar">bar</option>
        </select>

        <Switch
          checked={this.state.modeType}
          onChange={this.handleChangeMode('modeType')}
          value="modeType"
          inputProps={{ 'aria-label': 'secondary checkbox1' }}
        />
      </div>
    );
  }
}

export default App;
