import React, { Component } from 'react';
import Chart from 'react-apexcharts';

export default class extends Component {
  state = {
    chartOptions: {
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
            // endingShape: 'rounded',
            columnWidth: '55%',
            // barHeight: '20%',
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
          enabled: false
        },
        chart: {
          id: 'apexchart-example',
          type: 'bar',
          height: 200,
          width: '100%',
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
              customIcons: []
            },
            autoSelected: 'pan'
          }
        },
        title: {
          text: 'PM25',
          style: {
            fontSize: '16px',
            color: '#333333'
          }
        },
        theme: {
          mode: 'light'
        },
        xaxis: {
          type: 'datetime',
          categories: []
        },
        tooltip: {
          followCursor: true,
          x: {
            show: true,
            format: 'HH:mm:ss'
          }
        },
        colors: [
          function({ value, seriesIndex, w }) {
            if (value >= 251 && value <= 500) {
              return '#ab2b82';
            } else if (value >= 151 && value <= 250) {
              return '#c20f00';
            } else if (value >= 55 && value <= 150) {
              return '#ea4c3f';
            } else if (value >= 36 && value <= 54) {
              return '#fd8f3c';
            } else if (value >= 16 && value <= 35) {
              return '#fdbe39';
            } else if (value <= 15) {
              return '#48cfae';
            } else {
              return '#48cfae';
            }
          }
        ]
      },
      series: [
        {
          name: '',
          data: []
        }
      ]
    }
  };

  // showCharts = () => {
  //   const { data, options, width, height, type } = this.props;
  //   console.log(this.props);

  //   // return (
  //   //   <Chart
  //   //     options={this.state.chartOptions.options}
  //   //     series={[
  //   //       {
  //   //         data: data.pm25.data
  //   //       }
  //   //     ]}
  //   //     width={width}
  //   //     height={height}
  //   //     type={type}
  //   //   />
  //   // );
  // };
  render() {
    console.log(this.props);
    return (
      <>
        <Chart
          options={this.props.options}
          series={this.props.series}
          type="bar"
          width={this.props.width}
          height={this.props.height}
        />
      </>
    );
  }
}
/*

import React, { Component } from 'react';
import Day from 'dayjs';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from 'react-day-picker/moment';
import 'moment/locale/zh-tw';
import '../../style.css';
import AddressImg from '../../assets/images/device.png';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
// import Chart from '../../components/Chart';
import Charts from '../Chart/Charts';

const styles = {
  root: {
    color: '#666666',
    marginTop: '30px'
  },
  deviceAddress: {
    color: '#333333',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    '& img': {
      width: '30px',
      height: '50px',
      marginRight: '10px'
    }
  },
  hr: {
    border: '.5px solid #d8d8d8'
  },
  input: {
    textAlign: 'center',
    padding: '12px 60px'
  },
  submit: {
    background: 'linear-gradient(#04afaa, #00cccc)',
    color: '#fff',
    width: '70%',
    marginTop: '40px',
    '@media (max-width: 768px)': {
      marginTop: '20px'
    }
  }
};

class History extends Component {
  state = {
    addressName: '',
    // startTime 當天 00:00:00 開始, endTime 23:59:59
    startTime: Day(
      new Date(new Date().toLocaleDateString()).getTime()
    ).valueOf(),
    endTime: Day(
      new Date(new Date().toLocaleDateString()).getTime() +
        24 * 60 * 60 * 1000 -
        1
    ).valueOf(),
    chartOptions: {
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
            // endingShape: 'rounded',
            columnWidth: '55%',
            // barHeight: '20%',
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
          enabled: false
        },
        chart: {
          id: 'apexchart-example',
          type: 'bar',
          height: 320,
          width: '100%',
          animations: {
            enabled: false,
            animateGradually: {
              enabled: false
            },
            dynamicAnimation: {
              enabled: false
            }
          },
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
              customIcons: []
            },
            autoSelected: 'pan'
          }
        },
        title: {
          text: 'PM25',
          style: {
            fontSize: '16px',
            color: '#333333'
          }
        },
        theme: {
          mode: 'light'
        },
        xaxis: {
          type: 'datetime',
          categories: []
        },
        tooltip: {
          followCursor: true,
          x: {
            show: true,
            format: 'HH:mm:ss'
          }
        },
        colors: [
          function({ value, seriesIndex, w }) {
            if (value >= 251 && value <= 500) {
              return '#ab2b82';
            } else if (value >= 151 && value <= 250) {
              return '#c20f00';
            } else if (value >= 55 && value <= 150) {
              return '#ea4c3f';
            } else if (value >= 36 && value <= 54) {
              return '#fd8f3c';
            } else if (value >= 16 && value <= 35) {
              return '#fdbe39';
            } else if (value <= 15) {
              return '#48cfae';
            } else {
              return '#48cfae';
            }
          }
        ]
      },
      series: [
        {
          name: '',
          data: []
        }
      ]
    },
    data: []
  };
  componentDidMount() {
    const addressName = this.props.match.params.address;
    const { startTime, endTime } = this.state;
    this.setState({
      addressName
    });
    const token = localStorage.getItem('token');
    const axiosInstance = axios.create({
      baseURL: 'https://api.mjairql.com/api/v1/',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    axiosInstance
      .get(
        `getUserData?mac_address=${addressName}&start_time=${startTime}&end_time=${endTime}`
      )
      .then(response => {
        // console.log(response.data.userData);
        let upDateState = {
          ...this.state.chartOptions
        };
        let upDatePM25 = { ...upDateState };
        let upDatePM10 = { ...upDateState };
        let upDateTVOC = { ...upDateState };
        let upDateECO2 = { ...upDateState };
        let upDateHumidity = { ...upDateState };
        let upDateTemperature = { ...upDateState };
        response.data.userData.forEach(item => {
          for (let key in item) {
            switch (key) {
              // 將每個都加上 option
              case 'pm25':
                upDatePM25 = {
                  ...upDatePM25,
                  options: {
                    ...upDatePM25.options,
                    xaxis: {
                      ...upDatePM25.options.xaxis,
                      categories: [
                        ...upDatePM25.options.xaxis.categories,
                        item.timestamp
                      ],
                      min:
                        upDatePM25.options.xaxis.categories.length >= 12
                          ? Day(
                              upDatePM25.options.xaxis.categories[
                                upDatePM25.options.xaxis.categories.length - 12
                              ]
                            ).valueOf()
                          : undefined
                    },
                    title: {
                      ...upDatePM25.options.title,
                      text: 'PM2.5'
                    },
                    colors: [
                      function({ value, seriesIndex, w }) {
                        if (value >= 251 && value <= 500) {
                          return '#ab2b82';
                        } else if (value >= 151 && value <= 250) {
                          return '#c20f00';
                        } else if (value >= 55 && value <= 150) {
                          return '#ea4c3f';
                        } else if (value >= 36 && value <= 54) {
                          return '#fd8f3c';
                        } else if (value >= 16 && value <= 35) {
                          return '#fdbe39';
                        } else if (value <= 15) {
                          return '#48cfae';
                        } else {
                          return '#48cfae';
                        }
                      }
                    ]
                  },
                  series: [
                    {
                      name: 'PM25',
                      data: [...upDatePM25.series[0].data, item[key]]
                    }
                  ]
                };
                break;
              case 'tvoc':
                upDateTVOC = {
                  ...upDateTVOC,
                  options: {
                    ...upDateTVOC.options,
                    xaxis: {
                      ...upDateTVOC.options.xaxis,
                      categories: [
                        ...upDateTVOC.options.xaxis.categories,
                        item.timestamp
                      ],
                      min:
                        upDateTVOC.options.xaxis.categories.length >= 12
                          ? Day(
                              upDateTVOC.options.xaxis.categories[
                                upDateTVOC.options.xaxis.categories.length - 12
                              ]
                            ).valueOf()
                          : undefined
                    },
                    title: {
                      ...upDateTVOC.options.title,
                      text: 'TVOC'
                    },
                    colors: [
                      function({ value, seriesIndex, w }) {
                        if (value >= 20001) {
                          return '#ab2b82';
                        } else if (value >= 5501 && value <= 20000) {
                          return '#c20f00';
                        } else if (value >= 2201 && value <= 5500) {
                          return '#ea4c3f';
                        } else if (value >= 661 && value <= 2200) {
                          return '#fd8f3c';
                        } else if (value >= 221 && value <= 660) {
                          return '#fed65b';
                        } else if (value >= 0 && value <= 220) {
                          return '#48cfae';
                        } else {
                          return '#48cfae';
                        }
                      }
                    ]
                  },
                  series: [
                    {
                      name: 'TVOC',
                      data: [...upDateTVOC.series[0].data, item[key]]
                    }
                  ]
                };
                break;
              case 'eco2':
                upDateECO2 = {
                  ...upDateECO2,
                  options: {
                    ...upDateECO2.options,
                    xaxis: {
                      ...upDateECO2.options.xaxis,
                      categories: [
                        ...upDateECO2.options.xaxis.categories,
                        item.timestamp
                      ],
                      min:
                        upDateECO2.options.xaxis.categories.length >= 12
                          ? Day(
                              upDateECO2.options.xaxis.categories[
                                upDateECO2.options.xaxis.categories.length - 12
                              ]
                            ).valueOf()
                          : undefined
                    },
                    title: {
                      ...upDateECO2.options.title,
                      text: 'eCO2'
                    },
                    colors: [
                      function({ value, seriesIndex, w }) {
                        if (value >= 1501) {
                          return '#ea4c3f';
                        } else if (value >= 0 && value <= 1500) {
                          return '#4bc8a0';
                        }
                      }
                    ]
                  },
                  series: [
                    {
                      name: 'eCO2',
                      data: [...upDateECO2.series[0].data, item[key]]
                    }
                  ]
                };
                break;
              case 'humidity':
                upDateHumidity = {
                  ...upDateHumidity,
                  options: {
                    ...upDateHumidity.options,
                    xaxis: {
                      ...upDateHumidity.options.xaxis,
                      categories: [
                        ...upDateHumidity.options.xaxis.categories,
                        item.timestamp
                      ],
                      min:
                        upDateHumidity.options.xaxis.categories.length >= 12
                          ? Day(
                              upDateHumidity.options.xaxis.categories[
                                upDateHumidity.options.xaxis.categories.length -
                                  12
                              ]
                            ).valueOf()
                          : undefined
                    },
                    title: {
                      ...upDateHumidity.options.title,
                      text: '濕度'
                    },
                    colors: [
                      function({ value, seriesIndex, w }) {
                        if (value >= 65) {
                          return '#ea4c3f';
                        } else if (value >= 46 && value <= 65) {
                          return '#4bc8a0';
                        } else if (value <= 45) {
                          return '#13b5f0';
                        }
                      }
                    ]
                  },
                  series: [
                    {
                      name: '濕度',
                      data: [...upDateHumidity.series[0].data, item[key]]
                    }
                  ]
                };
                break;
              case 'temperature':
                upDateTemperature = {
                  ...upDateTemperature,
                  options: {
                    ...upDateTemperature.options,
                    xaxis: {
                      ...upDateTemperature.options.xaxis,
                      categories: [
                        ...upDateTemperature.options.xaxis.categories,
                        item.timestamp
                      ],
                      min:
                        upDateTemperature.options.xaxis.categories.length >= 12
                          ? Day(
                              upDateTemperature.options.xaxis.categories[
                                upDateTemperature.options.xaxis.categories
                                  .length - 12
                              ]
                            ).valueOf()
                          : undefined
                    },
                    title: {
                      ...upDateTemperature.options.title,
                      text: '溫度'
                    },
                    colors: [
                      function({ value, seriesIndex, w }) {
                        if (value >= 26) {
                          return '#ea4c3f';
                        } else if (value >= 19 && value <= 25) {
                          return '#4bc8a0';
                        } else if (value >= 0 && value <= 18) {
                          return '#13b5f0';
                        }
                      }
                    ]
                  },
                  series: [
                    {
                      name: '溫度',
                      data: [...upDateTemperature.series[0].data, item[key]]
                    }
                  ]
                };
                break;
              case 'pm10':
                upDatePM10 = {
                  ...upDatePM10,
                  options: {
                    ...upDatePM10.options,
                    xaxis: {
                      ...upDatePM10.options.xaxis,
                      categories: [
                        ...upDatePM10.options.xaxis.categories,
                        item.timestamp
                      ],
                      min:
                        upDatePM10.options.xaxis.categories.length >= 12
                          ? Day(
                              upDatePM10.options.xaxis.categories[
                                upDatePM10.options.xaxis.categories.length - 12
                              ]
                            ).valueOf()
                          : undefined
                    },
                    title: {
                      ...upDatePM10.options.title,
                      text: 'PM10'
                    },
                    colors: [
                      function({ value, seriesIndex, w }) {
                        if (value >= 425) {
                          return '#ab2b82';
                        } else if (value >= 355 && value <= 424) {
                          return '#c20f00';
                        } else if (value >= 255 && value <= 354) {
                          return '#ea4c3f';
                        } else if (value >= 126 && value <= 254) {
                          return '#fd8f3c';
                        } else if (value >= 55 && value <= 125) {
                          return '#fdbe39';
                        } else if (value >= 0 && value <= 54) {
                          return '#48cfae';
                        } else {
                          return '#48cfae';
                        }
                      }
                    ]
                  },
                  series: [
                    {
                      name: 'PM10',
                      data: [...upDatePM10.series[0].data, item[key]]
                    }
                  ]
                };
                break;
              default:
                break;
            }
          }
        });
        this.setState({
          data: [
            { ...upDatePM25 },
            { ...upDatePM10 },
            { ...upDateTVOC },
            { ...upDateECO2 },
            { ...upDateHumidity },
            { ...upDateTemperature }
          ]
        });
      })
      .catch(error => console.log(error));
  }
  handleDayChange = day => {
    console.log(day);
    const startTime = `${Day(day).format('YYYY-MM-DD')} 00:00:00`;
    const endTime = `${Day(day).format('YYYY-MM-DD')} 23:59:59`;
    this.setState({
      startTime: Day(startTime).valueOf(),
      endTime: Day(endTime).valueOf()
    });
  };

  handleClick = () => {
    const addressName = this.props.match.params.address;
    const { startTime, endTime, chartOptions } = this.state;
    console.log(Day(startTime), Day(endTime));

    console.log(startTime, endTime);
    this.setState({
      addressName
    });
    const token = localStorage.getItem('token');
    const axiosInstance = axios.create({
      baseURL: 'https://api.mjairql.com/api/v1/',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    axiosInstance
      .get(
        `getUserData?mac_address=${addressName}&start_time=${startTime}&end_time=${endTime}`
      )
      .then(response => {
        // console.log(response.data.userData);
        let upDateState = {
          ...this.state.chartOptions
        };
        let upDatePM25 = { ...upDateState };
        let upDatePM10 = { ...upDateState };
        let upDateTVOC = { ...upDateState };
        let upDateECO2 = { ...upDateState };
        let upDateHumidity = { ...upDateState };
        let upDateTemperature = { ...upDateState };
        response.data.userData.forEach(item => {
          for (let key in item) {
            switch (key) {
              // 將每個都加上 option
              case 'pm25':
                upDatePM25 = {
                  ...upDatePM25,
                  options: {
                    ...upDatePM25.options,
                    xaxis: {
                      ...upDatePM25.options.xaxis,
                      categories: [
                        ...upDatePM25.options.xaxis.categories,
                        item.timestamp
                      ],
                      min:
                        upDatePM25.options.xaxis.categories.length >= 12
                          ? Day(
                              upDatePM25.options.xaxis.categories[
                                upDatePM25.options.xaxis.categories.length - 12
                              ]
                            ).valueOf()
                          : undefined
                    },
                    title: {
                      ...upDatePM25.options.title,
                      text: 'PM2.5'
                    },
                    colors: [
                      function({ value, seriesIndex, w }) {
                        if (value >= 251 && value <= 500) {
                          return '#ab2b82';
                        } else if (value >= 151 && value <= 250) {
                          return '#c20f00';
                        } else if (value >= 55 && value <= 150) {
                          return '#ea4c3f';
                        } else if (value >= 36 && value <= 54) {
                          return '#fd8f3c';
                        } else if (value >= 16 && value <= 35) {
                          return '#fdbe39';
                        } else if (value <= 15) {
                          return '#48cfae';
                        } else {
                          return '#48cfae';
                        }
                      }
                    ]
                  },
                  series: [
                    {
                      name: 'PM25',
                      data: [...upDatePM25.series[0].data, item[key]]
                    }
                  ]
                };
                break;
              case 'tvoc':
                upDateTVOC = {
                  ...upDateTVOC,
                  options: {
                    ...upDateTVOC.options,
                    xaxis: {
                      ...upDateTVOC.options.xaxis,
                      categories: [
                        ...upDateTVOC.options.xaxis.categories,
                        item.timestamp
                      ],
                      min:
                        upDateTVOC.options.xaxis.categories.length >= 12
                          ? Day(
                              upDateTVOC.options.xaxis.categories[
                                upDateTVOC.options.xaxis.categories.length - 12
                              ]
                            ).valueOf()
                          : undefined
                    },
                    title: {
                      ...upDateTVOC.options.title,
                      text: 'TVOC'
                    },
                    colors: [
                      function({ value, seriesIndex, w }) {
                        if (value >= 20001) {
                          return '#ab2b82';
                        } else if (value >= 5501 && value <= 20000) {
                          return '#c20f00';
                        } else if (value >= 2201 && value <= 5500) {
                          return '#ea4c3f';
                        } else if (value >= 661 && value <= 2200) {
                          return '#fd8f3c';
                        } else if (value >= 221 && value <= 660) {
                          return '#fed65b';
                        } else if (value >= 0 && value <= 220) {
                          return '#48cfae';
                        } else {
                          return '#48cfae';
                        }
                      }
                    ]
                  },
                  series: [
                    {
                      name: 'TVOC',
                      data: [...upDateTVOC.series[0].data, item[key]]
                    }
                  ]
                };
                break;
              case 'eco2':
                upDateECO2 = {
                  ...upDateECO2,
                  options: {
                    ...upDateECO2.options,
                    xaxis: {
                      ...upDateECO2.options.xaxis,
                      categories: [
                        ...upDateECO2.options.xaxis.categories,
                        item.timestamp
                      ],
                      min:
                        upDateECO2.options.xaxis.categories.length >= 12
                          ? Day(
                              upDateECO2.options.xaxis.categories[
                                upDateECO2.options.xaxis.categories.length - 12
                              ]
                            ).valueOf()
                          : undefined
                    },
                    title: {
                      ...upDateECO2.options.title,
                      text: 'eCO2'
                    },
                    colors: [
                      function({ value, seriesIndex, w }) {
                        if (value >= 1501) {
                          return '#ea4c3f';
                        } else if (value >= 0 && value <= 1500) {
                          return '#4bc8a0';
                        }
                      }
                    ]
                  },
                  series: [
                    {
                      name: 'eCO2',
                      data: [...upDateECO2.series[0].data, item[key]]
                    }
                  ]
                };
                break;
              case 'humidity':
                upDateHumidity = {
                  ...upDateHumidity,
                  options: {
                    ...upDateHumidity.options,
                    xaxis: {
                      ...upDateHumidity.options.xaxis,
                      categories: [
                        ...upDateHumidity.options.xaxis.categories,
                        item.timestamp
                      ],
                      min:
                        upDateHumidity.options.xaxis.categories.length >= 12
                          ? Day(
                              upDateHumidity.options.xaxis.categories[
                                upDateHumidity.options.xaxis.categories.length -
                                  12
                              ]
                            ).valueOf()
                          : undefined
                    },
                    title: {
                      ...upDateHumidity.options.title,
                      text: '濕度'
                    },
                    colors: [
                      function({ value, seriesIndex, w }) {
                        if (value >= 65) {
                          return '#ea4c3f';
                        } else if (value >= 46 && value <= 65) {
                          return '#4bc8a0';
                        } else if (value <= 45) {
                          return '#13b5f0';
                        }
                      }
                    ]
                  },
                  series: [
                    {
                      name: '濕度',
                      data: [...upDateHumidity.series[0].data, item[key]]
                    }
                  ]
                };
                break;
              case 'temperature':
                upDateTemperature = {
                  ...upDateTemperature,
                  options: {
                    ...upDateTemperature.options,
                    xaxis: {
                      ...upDateTemperature.options.xaxis,
                      categories: [
                        ...upDateTemperature.options.xaxis.categories,
                        item.timestamp
                      ],
                      min:
                        upDateTemperature.options.xaxis.categories.length >= 12
                          ? Day(
                              upDateTemperature.options.xaxis.categories[
                                upDateTemperature.options.xaxis.categories
                                  .length - 12
                              ]
                            ).valueOf()
                          : undefined
                    },
                    title: {
                      ...upDateTemperature.options.title,
                      text: '溫度'
                    },
                    colors: [
                      function({ value, seriesIndex, w }) {
                        if (value >= 26) {
                          return '#ea4c3f';
                        } else if (value >= 19 && value <= 25) {
                          return '#4bc8a0';
                        } else if (value >= 0 && value <= 18) {
                          return '#13b5f0';
                        }
                      }
                    ]
                  },
                  series: [
                    {
                      name: '溫度',
                      data: [...upDateTemperature.series[0].data, item[key]]
                    }
                  ]
                };
                break;
              case 'pm10':
                upDatePM10 = {
                  ...upDatePM10,
                  options: {
                    ...upDatePM10.options,
                    xaxis: {
                      ...upDatePM10.options.xaxis,
                      categories: [
                        ...upDatePM10.options.xaxis.categories,
                        item.timestamp
                      ],
                      min:
                        upDatePM10.options.xaxis.categories.length >= 12
                          ? Day(
                              upDatePM10.options.xaxis.categories[
                                upDatePM10.options.xaxis.categories.length - 12
                              ]
                            ).valueOf()
                          : undefined
                    },
                    title: {
                      ...upDatePM10.options.title,
                      text: 'PM10'
                    },
                    colors: [
                      function({ value, seriesIndex, w }) {
                        if (value >= 425) {
                          return '#ab2b82';
                        } else if (value >= 355 && value <= 424) {
                          return '#c20f00';
                        } else if (value >= 255 && value <= 354) {
                          return '#ea4c3f';
                        } else if (value >= 126 && value <= 254) {
                          return '#fd8f3c';
                        } else if (value >= 55 && value <= 125) {
                          return '#fdbe39';
                        } else if (value >= 0 && value <= 54) {
                          return '#48cfae';
                        } else {
                          return '#48cfae';
                        }
                      }
                    ]
                  },
                  series: [
                    {
                      name: 'PM10',
                      data: [...upDatePM10.series[0].data, item[key]]
                    }
                  ]
                };
                break;
              default:
                break;
            }
          }
        });
        this.setState({
          data: [
            { ...upDatePM25 },
            { ...upDatePM10 },
            { ...upDateTVOC },
            { ...upDateECO2 },
            { ...upDateHumidity },
            { ...upDateTemperature }
          ]
        });

        // let upDateState = {
        //   ...chartOptions,
        //   options: {
        //     ...chartOptions.options,
        //     xaxis: {
        //       ...chartOptions.options.xaxis,
        //       categories: []
        //     }
        //   },
        //   series: [{ data: [] }]
        // };
        // response.data.userData.forEach(item => {
        //   upDateState = {
        //     ...upDateState,
        //     options: {
        //       ...upDateState.options,
        //       xaxis: {
        //         ...upDateState.options.xaxis,
        //         categories: [
        //           ...upDateState.options.xaxis.categories,
        //           item.timestamp
        //         ]
        //       }
        //     },
        //     series: [
        //       {
        //         data: [...upDateState.series[0].data, item.pm25]
        //       }
        //     ]
        //   };
        // });
        // console.log(upDateState);
        // if (upDateState.options.xaxis.categories.length >= 100) {
        //   upDateState = {
        //     ...upDateState,
        //     options: {
        //       ...upDateState.options,
        //       xaxis: {
        //         ...upDateState.options.xaxis,
        //         min: Day(
        //           upDateState.options.xaxis.categories[
        //             upDateState.options.xaxis.categories.length - 12
        //           ]
        //         ).valueOf()
        //       }
        //     }
        //   };
        // } else {
        //   upDateState = {
        //     ...upDateState,
        //     options: {
        //       ...upDateState.options,
        //       xaxis: {
        //         ...upDateState.options.xaxis,
        //         min: undefined
        //       }
        //     }
        //   };
        // }
        // this.setState({
        //   chartOptions: upDateState
        // });
      })
      .catch(error => console.log(error));
  };
  render() {
    const {
      addressName,
      chartOptions: { options, series },
      width,
      data
    } = this.state;
    // console.log(data);
    let chartList = data.map((item, index) => <Charts data={item} />);
    if (data.length === 0) {
      chartList = <div>Loading...</div>;
    }
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <Grid container spacing={4}>
          {/* <Grid item md={3} sm={12} xs={12}>
            <div className={classes.deviceAddress}>
              <img src={AddressImg} alt="" />
              {addressName}
            </div>
            <hr className={classes.hr} />
            <div className="styled-input-container">
              <p>圖表</p>
              <div className="styled-input-single">
                <input type="radio" name="chart" id="bar" />
                <label htmlFor="bar">長條圖</label>
              </div>
              <div className="styled-input-single">
                <input type="radio" name="chart" id="area" />
                <label htmlFor="area">曲線圖</label>
              </div>
            </div>
            <hr className={classes.hr} />
            <div className="styled-input-container">
              <p>區間</p>
              <div className="styled-input-single">
                <input type="radio" name="range" id="day" />
                <label htmlFor="day">日</label>
              </div>
              <div className="styled-input-single">
                <input type="radio" name="range" id="month" />
                <label htmlFor="month">月</label>
              </div>
              <div className="styled-input-single">
                <input type="radio" name="range" id="year" />
                <label htmlFor="year">年</label>
              </div>
            </div>
            <hr className={classes.hr} />
            <div>
              <p>日期</p>

              <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                format="LL"
                onDayChange={this.handleDayChange}
                dayPickerProps={{
                  locale: 'zh-tw',
                  localeUtils: MomentLocaleUtils
                }}
                inputProps={{
                  style: {
                    textAlign: 'center',
                    padding: '12px 30px',
                    fontSize: '16px',
                    color: '#cccccc'
                  }
                }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className={classes.submit}
              onClick={this.handleClick}
            >
              搜尋
            </Button>
          </Grid> }
          <Grid item md={9} sm={12} xs={12}>
            {chartList}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(History);
*/
