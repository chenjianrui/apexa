import React, { Component } from 'react';
import Day from 'dayjs';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from 'react-day-picker/moment';
import 'moment/locale/zh-tw';
import '../../style.css';
import MonthPickerInput from 'react-month-picker-calendar';
import AddressImg from '../../assets/images/device.png';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
// import Chart from '../../components/Chart';
import Charts from '../Chart/Charts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { fetchHistory, cleanDate } from '../../store/actions/history';
import Snackbar from '../../components/Snackbar/Snackbar';

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
  },
  circularProgress: {
    color: '#fff'
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
    selectDateType: 'day'
  };

  componentDidMount() {
    const addressName = this.props.match.params.address;
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    }
    this.setState({
      addressName
    });
  }

  componentWillUnmount() {
    console.log('unmount');
    this.props.cleanDate(this.props.match.params.address);
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

  handleClick = e => {
    e.preventDefault();
    const addressName = this.props.match.params.address;
    const { startTime, endTime } = this.state;
    this.setState({
      addressName
    });
    const token = localStorage.getItem('token');
    this.props.fetchHistory(addressName, startTime, endTime);
  };

  handleChangeDate = e => {
    console.log(e.target);
    this.setState({
      selectDateType: e.target.id
    });
  };

  render() {
    const { addressName, selectDateType } = this.state;
    const { classes, loading, error, chartData } = this.props;
    console.log(chartData);
    let chartList = <div>選個日期啦</div>;
    let errorMessage = null;
    if (error) {
      errorMessage = <Snackbar open={error} />;
    }
    if (chartData.length !== 0) {
      chartList = chartData.map((item, index) => (
        <Charts data={item} key={index} loading={loading} />
      ));
    }

    let showDateSelect = (
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
    );
    if (selectDateType !== 'day') {
      showDateSelect = (
        <MonthPickerInput
          lang="ja"
          year={2019}
          placeholder="YYYY-MM"
          value={new Date()}
          onChangeYearUpdate={true}
          closeOnSelect={true}
          onChange={function(selectedYear, selectedMonth) {
            console.log(selectedYear);
          }}
        />
      );
    }
    return (
      <Container className={classes.root}>
        <Grid container spacing={4}>
          <Grid item md={3} sm={12} xs={12}>
            <div className={classes.deviceAddress}>
              <img src={AddressImg} alt="" />
              {addressName}
            </div>
            <hr className={classes.hr} />
            <form className="dateInput">
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
                  <input
                    type="radio"
                    name="date"
                    id="day"
                    onChange={this.handleChangeDate}
                    value="day"
                    checked={this.state.selectDateType === 'day'}
                  />
                  <label htmlFor="day">日</label>
                </div>
                <div className="styled-input-single">
                  <input
                    type="radio"
                    name="date"
                    id="month"
                    onChange={this.handleChangeDate}
                    value="month"
                    checked={this.state.selectDateType === 'month'}
                  />
                  <label htmlFor="month">月</label>
                </div>
                <div className="styled-input-single">
                  <input
                    type="radio"
                    name="date"
                    id="year"
                    onChange={this.handleChangeDate}
                    value="year"
                    checked={this.state.selectDateType === 'year'}
                  />
                  <label htmlFor="year">年</label>
                </div>
              </div>
              <hr className={classes.hr} />
              <div>
                <p>{selectDateType === 'day' ? '日期' : '月份'}</p>
                {showDateSelect}
              </div>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={classes.submit}
                onClick={this.handleClick}
              >
                {loading ? (
                  <CircularProgress
                    className={classes.circularProgress}
                    size={25}
                  />
                ) : (
                  '搜尋'
                )}
              </Button>
            </form>
          </Grid>
          <Grid item md={9} sm={12} xs={12}>
            {errorMessage}
            {chartList}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchHistory: (addressName, startDate, endDate) =>
      dispatch(fetchHistory(addressName, startDate, endDate)),
    cleanDate: addressName => dispatch(cleanDate(addressName))
  };
};

const mapStateToProps = state => {
  console.log(state);
  return {
    loading: state.history.loading,
    chartData: state.history.data,
    error: state.history.error
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(History));
