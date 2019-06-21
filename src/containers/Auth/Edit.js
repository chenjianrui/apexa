import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
const styles = {
  root: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  typography: {
    color: '#666666',
    marginBottom: '50px'
  },
  textField: {
    backgroundColor: '#fff',
    '& label.Mui-focused': {
      color: '#333333'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#333333'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#333333'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#333333',
      borderWidth: '1px'
    }
  },
  submit: {
    background: 'linear-gradient(#00cccc, #04afaa)',
    color: '#fff',
    marginTop: '40px',
    '@media (max-width: 768px)': {
      marginTop: '20px'
    }
  },
  errorText: {
    color: '#f26a55',
    margin: '10px'
  },
  circularProgress: {
    color: '#fff'
  }
};
class Edit extends Component {
  state = {
    loading: false,
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
    isDifferent: false,
    maxLength: 6,
    isMaxLength: false
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleBlur = e => {
    const { maxLength } = this.state;
    if (e.target.value.length < maxLength) {
      this.setState({
        isMaxLength: true
      });
    } else {
      this.setState({
        isMaxLength: false
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { newPassword, repeatPassword } = this.state;
    const token =
      JSON.parse(localStorage.getItem('token')) ||
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYzNTQ5YjI5Y2ZhNzlmNTYxNTY5YzRlZDNlZGQ0N2VjNDFiYmQwZmQ2NDVmNDJkYTEwNGE4ODllMTMxYTc0NTYwNjk0OTY4ODZiMjg3MDU3In0.eyJhdWQiOiIxIiwianRpIjoiZjM1NDliMjljZmE3OWY1NjE1NjljNGVkM2VkZDQ3ZWM0MWJiZDBmZDY0NWY0MmRhMTA0YTg4OWUxMzFhNzQ1NjA2OTQ5Njg4NmIyODcwNTciLCJpYXQiOjE1NjEwMzYzNDYsIm5iZiI6MTU2MTAzNjM0NiwiZXhwIjoxNTkyNjU4NzQ2LCJzdWIiOiI0MTgiLCJzY29wZXMiOltdfQ.j5KMllF0Ig1pteLzfRe90cjNrn2Cg9UopwTs2QCRBvJa2dpEMX_MRCUEDI3lXUH7cGNlut7dTSn9XIXus3Ii0KAU60WrqkrgbDBWpaGx3IxMPR1QbHpCTHJ3nOUk1iWRARkkj1e-EKqJwLUbm8x8_NwtjPqQBZaGsgYyLLHMkhniS7WdYQAHIj6lK6CLbbiWmEQJuyRDujrAgab9TkPRKM25yIh_Hfp-yC7cpxE9ZOFm5MOmtyZtJVsRwXYwSj6N8I43GWP1yPFpKqQhDWTsRU_sA2WR7uoSBJfrAlnJbZRcF6lOpk2exIpdU_VYRHIYDfqx1DeaP93mjgql4_5kumbsN2rF93gETsTvit7XNplfyaEslNah-ugrpauSIy4-d7N9LZiroc4bH5EaP1QvMHQJ02xg-cFj_rxLrklO93nckMUMm6f_s4rw_yeRHFVXKi9SHJVddGj8cfNvF-d8ruwKZwr1pK32LjxwXD8J_N_TfjVcTzffsjbI5Kf1F0XUozQygDpcF3HYsxl7ybEhtMwGKklzG3oouIOhZMMUrtuDk8PEAVuG2pyf6L0ai0X1Splm6pGkezBOoCa6yt0Ue1yU01pkWuPkbhXiY1en8eaFpyJydG7W5lNHPwZpTpFx5eTDRu6nXSBkSWCa_-2gCpbgcXzwzPfrc5ZJ5Ec43eE';
    console.log(token);
    if (newPassword !== repeatPassword) {
      this.setState({ isDifferent: true });
    } else {
      this.setState({ isDifferent: false, loading: true });
    }
    console.log(newPassword);
    const axiosInstance = axios.create({
      baseURL: 'https://api.mjairql.com/api/v1/',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    axiosInstance
      .post('editUserData', {
        password: newPassword
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };
  render() {
    const { classes } = this.props;
    const { loading, isDifferent, isMaxLength } = this.state;
    return (
      <Container maxWidth="xs" className={classes.root}>
        <CssBaseline />
        <Typography
          variant="h5"
          color="textPrimary"
          gutterBottom
          className={classes.typography}
        >
          更改密碼
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            name="oldPassword"
            label="現在的密碼"
            type="password"
            id="oldPassword"
            className={classes.textField}
            autoComplete="current-oldPassword"
            onChange={this.handleChange('oldPassword')}
          />
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            name="newPassword"
            label="新的密碼"
            type="password"
            id="newPassword"
            className={classes.textField}
            autoComplete="current-newPassword"
            onChange={this.handleChange('newPassword')}
            onBlur={this.handleBlur}
          />
          {isMaxLength ? (
            <p className={classes.errorText}>密碼最少為6個英數字</p>
          ) : null}
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            name="repeatPassword"
            label="再次確認新密碼"
            type="password"
            id="repeatPassword"
            className={classes.textField}
            autoComplete="current-repeatPassword"
            onChange={this.handleChange('repeatPassword')}
          />
          {isDifferent ? (
            <p className={classes.errorText}>新密碼不一致</p>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                className={classes.circularProgress}
                size={25}
              />
            ) : (
              '確認'
            )}
          </Button>
        </form>
      </Container>
    );
  }
}

export default withStyles(styles)(Edit);
