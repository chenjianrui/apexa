import * as actionTypes from './actionTypes';
import axios from 'axios';
import Day from 'dayjs';

export const fetchHistoryStart = () => {
  return {
    type: actionTypes.FETCH_HISTORY_START
  };
};

export const fetchHistory = (addressName, startDate, endDate) => dispatch => {
  dispatch(fetchHistoryStart());
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
      `getUserData?mac_address=${addressName}&start_time=${startDate}&end_time=${endDate}`
    )
    .then(response => {
      console.log(response);
      const chartOptions = {
        title: '',
        labels: [],
        data: [],
        colors: []
      };
      let upDateState = {
        ...chartOptions
      };
      let upDatePM25 = { ...upDateState };
      let upDatePM10 = { ...upDateState };
      let upDateTVOC = { ...upDateState };
      let upDateECO2 = { ...upDateState };
      let upDateHumidity = { ...upDateState };
      let upDateTemperature = { ...upDateState };
      let color = '';
      response.data.userData.forEach(item => {
        for (let key in item) {
          switch (key) {
            // 將每個都加上 option
            case 'pm25':
              color = '';
              if (item[key] >= 251 && item[key] <= 500) {
                color = '#ab2b82';
              } else if (item[key] >= 151 && item[key] <= 250) {
                color = '#c20f00';
              } else if (item[key] >= 55 && item[key] <= 150) {
                color = '#ea4c3f';
              } else if (item[key] >= 36 && item[key] <= 54) {
                color = '#fd8f3c';
              } else if (item[key] >= 16 && item[key] <= 35) {
                color = '#fed65b';
              } else if (item[key] >= 0 && item[key] <= 15) {
                color = '#4bc8a0';
              } else {
                color = '#4bc8a0';
              }
              upDatePM25 = {
                ...upDatePM25,
                title: 'PM25',
                labels: [
                  ...upDatePM25.labels,
                  Day(item.timestamp).format('HH:mm')
                ],
                data: [...upDatePM25.data, item[key]],
                colors: [...upDatePM25.colors, color]
              };
              break;
            case 'tvoc':
              color = '';
              if (item[key] >= 20001) {
                color = '#ab2b82';
              } else if (item[key] >= 5501 && item[key] <= 20000) {
                color = '#c20f00';
              } else if (item[key] >= 2201 && item[key] <= 5500) {
                color = '#ea4c3f';
              } else if (item[key] >= 661 && item[key] <= 2200) {
                color = '#fd8f3c';
              } else if (item[key] >= 221 && item[key] <= 660) {
                color = '#fed65b';
              } else if (item[key] >= 0 && item[key] <= 220) {
                color = '#4bc8a0';
              } else {
                color = '#4bc8a0';
              }
              upDateTVOC = {
                ...upDateTVOC,
                title: 'TVOC',
                labels: [
                  ...upDateTVOC.labels,
                  Day(item.timestamp).format('HH:mm')
                ],
                data: [...upDateTVOC.data, item[key]],
                colors: [...upDateTVOC.colors, color]
              };
              break;
            case 'eco2':
              color = '';
              if (item[key] >= 1501) {
                color = '#ea4c3f';
              } else if (item[key] >= 0 && item[key] <= 1500) {
                color = '#4bc8a0';
              } else {
                color = '#4bc8a0';
              }
              upDateECO2 = {
                ...upDateECO2,
                title: 'eCO2',
                labels: [
                  ...upDateECO2.labels,
                  Day(item.timestamp).format('HH:mm')
                ],
                data: [...upDateECO2.data, item[key]],
                colors: [...upDateECO2.colors, color]
              };
              break;
            case 'humidity':
              color = '';
              if (item[key] >= 65) {
                color = '#ea4c3f';
              } else if (item[key] >= 46 && item[key] <= 65) {
                color = '#4bc8a0';
              } else if (item[key] <= 45) {
                color = '#13b5f0';
              } else {
                color = '#13b5f0';
              }
              upDateHumidity = {
                ...upDateHumidity,
                title: '濕度',
                labels: [
                  ...upDateHumidity.labels,
                  Day(item.timestamp).format('HH:mm')
                ],
                data: [...upDateHumidity.data, item[key]],
                colors: [...upDateHumidity.colors, color]
              };
              break;
            case 'temperature':
              color = '';
              if (item[key] >= 26) {
                color = '#ea4c3f';
              } else if (item[key] >= 19 && item[key] <= 25) {
                color = '#4bc8a0';
              } else if (item[key] >= 0 && item[key] <= 18) {
                color = '#13b5f0';
              } else {
                color = '#13b5f0';
              }
              upDateTemperature = {
                ...upDateTemperature,
                title: '溫度',
                labels: [
                  ...upDateTemperature.labels,
                  Day(item.timestamp).format('HH:mm')
                ],
                data: [...upDateTemperature.data, item[key]],
                colors: [...upDateTemperature.colors, color]
              };
              break;
            case 'pm10':
              color = '';
              if (item[key] >= 425) {
                color = '#ab2b82';
              } else if (item[key] >= 355 && item[key] <= 424) {
                color = '#c20f00';
              } else if (item[key] >= 255 && item[key] <= 354) {
                color = '#ea4c3f';
              } else if (item[key] >= 126 && item[key] <= 254) {
                color = '#fd8f3c';
              } else if (item[key] >= 55 && item[key] <= 125) {
                color = '#fed65b';
              } else if (item[key] >= 0 && item[key] <= 54) {
                color = '#4bc8a0';
              } else {
                color = '#4bc8a0';
              }
              upDatePM10 = {
                ...upDatePM10,
                title: 'PM10',
                labels: [
                  ...upDatePM10.labels,
                  Day(item.timestamp).format('HH:mm')
                ],
                data: [...upDatePM10.data, item[key]],
                colors: [...upDatePM10.colors, color]
              };
              break;
            default:
              break;
          }
        }
      });

      const data = [
        { ...upDatePM25 },
        { ...upDatePM10 },
        { ...upDateTVOC },
        { ...upDateECO2 },
        { ...upDateHumidity },
        { ...upDateTemperature }
      ];
      dispatch({
        type: actionTypes.FETCH_HISTORY_SUCCESS,
        payload: data
      });
    })
    .catch(error => {
      dispatch({ type: actionTypes.FETCH_HISTORY_FAIL });
    });
};

export const cleanDate = () => {
  return { type: actionTypes.CLEAN_DATA };
};
