import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dialog from '../../components/Dialog/Dialog';

const styles = {
  textField: {
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
      borderColor: '#333333'
    }
  },
  root: {
    backgroundColor: '#fff',
    padding: '40px 40px',
    borderRadius: '10px',
    '@media (max-width: 768px)': {
      padding: '20px 24px'
    }
  },
  typography: {
    marginBottom: '40px',
    color: '#00cccc',
    '@media (max-width: 768px)': {
      marginBottom: '20px'
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
  facebook: {
    background: '#365a9e',
    color: '#fff',
    '&.MuiButton-contained:hover': {
      backgroundColor: '#365a9e'
    },
    margin: '30px 0 10px'
  },
  forgetLink: {
    textAlign: 'center',
    margin: '30px 0 10px',
    '& a': {
      textDecoration: 'none',
      color: '#00cccc'
    }
  },
  line: {
    height: '1px',
    borderTop: '1px solid #999999',
    textAlign: 'center',
    marginTop: '30px',
    '& span': {
      position: 'relative',
      top: '-10px',
      background: '#fff',
      padding: '0 10px',
      color: '#999999'
    }
  },
  circularProgress: {
    color: '#fff'
  }
};

class Login extends Component {
  state = {
    email: '',
    password: '',
    isEmpty: false,
    disabled: false,
    open: false
  };

  handleChange = name => event => {
    if (event.target.value !== '') {
      this.setState({
        isEmpty: false,
        [name]: event.target.value
      });
    }
  };

  handleSubmit = e => {
    const { email, password } = this.state;
    e.preventDefault();
    if (
      email === '' ||
      password === '' ||
      email.search(/^([\w\.\-]){1,64}\@([\w\.\-]){1,64}$/) === -1
    ) {
      this.setState(prevState => ({
        isEmpty: true
      }));
      return;
    }
    this.setState({
      disabled: true
    });
    axios
      .post('https://api.mjairql.com/api/v2/login', {
        email,
        password
      })
      .then(response => console.log(response))
      .catch(error => this.setState({ isEmpty: true, disabled: false }));
  };

  handleFBLogin = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };
  handleDialogToggle = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  render() {
    const { isEmpty, disabled, open } = this.state;
    const { classes } = this.props;
    return (
      <div className="login-bgImage">
        <Container component="main" maxWidth="xs" className={classes.root}>
          <CssBaseline />
          <div>
            <Typography
              className={classes.typography}
              component="h1"
              variant="h5"
            >
              登入
            </Typography>
            {isEmpty ? (
              <p style={{ color: '#f26a55' }}>您的郵件帳號或密碼不正確</p>
            ) : null}
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                className={classes.textField}
                onChange={this.handleChange('email')}
              />
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                name="password"
                label="密碼"
                type="password"
                id="password"
                className={classes.textField}
                autoComplete="current-password"
                onChange={this.handleChange('password')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                disabled={disabled}
              >
                {disabled ? (
                  <CircularProgress
                    className={classes.circularProgress}
                    size={25}
                  />
                ) : (
                  '登入'
                )}
              </Button>
              <Grid container>
                <Grid item xs={12} className={classes.forgetLink}>
                  <Link to="/forgot">忘記密碼</Link>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <div className={classes.line}>
                    <span>或使用以下帳號登入</span>
                  </div>
                </Grid>

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  onClick={this.handleDialogToggle}
                  className={classes.facebook}
                >
                  Facebook
                </Button>
              </Grid>
            </form>
          </div>
        </Container>
        <Dialog
          open={open}
          sm={true}
          text="你沒有朋友。"
          handleClose={this.handleDialogToggle}
          buttonText="確認"
        />
      </div>
    );
  }
}

export default withStyles(styles)(Login);
