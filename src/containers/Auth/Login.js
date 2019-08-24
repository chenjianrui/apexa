import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import iconFB from '../../assets/images/ic_facebook.png';
import { Link, Redirect } from 'react-router-dom';
import Dialog from '../../components/Dialog/Dialog';
import { login } from '../../store/actions/auth';
import { connect } from 'react-redux';

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
      borderColor: '#333333',
      borderWidth: '1px'
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
    background: 'linear-gradient(#04afaa, #00cccc)',
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
      color: 'red'
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
  },
  iconFB: {
    width: '20px',
    height: '20px',
    marginRight: '20px'
  }
};

class Login extends Component {
  state = {
    email: '',
    password: '',
    isEmpty: false,
    open: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error) {
      if (this.props.error) {
        this.setState({ isEmpty: true });
      } else {
        this.setState({ isEmpty: false });
      }
    }
  }

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
      this.setState({
        isEmpty: true
      });
      return;
    }
    this.props.login(email, password);
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
    const { open, isEmpty } = this.state;
    const { classes, loading, isAuthenticate } = this.props;
    let authRedirect = null;
    if (isAuthenticate) {
      authRedirect = <Redirect to="/" />;
    }
    return (
      <div className="login-bgImage">
        {authRedirect}
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
                disabled={loading}
              >
                {loading ? (
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
                  <img src={iconFB} alt="icon_FB" className={classes.iconFB} />
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

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuthenticate: state.auth.token !== null,
    error: state.auth.loginError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
