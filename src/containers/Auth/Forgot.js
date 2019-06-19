import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
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
  facebook: {
    background: '#365a9e',
    color: '#fff',
    '&.MuiButton-contained:hover': {
      backgroundColor: '#365a9e'
    },
    margin: '30px 0 10px'
  },
  grid: {
    textAlign: 'center',
    padding: '0 10px',
    '& a': {
      textDecoration: 'none',
      color: '#00cccc'
    },
    '& button': {
      background: 'linear-gradient(#00cccc, #04afaa)',
      color: '#fff',
      marginTop: '40px',
      '@media (max-width: 768px)': {
        marginTop: '20px'
      }
    }
  },
  cancel: {
    background: '#fff !important',
    color: '#cccccc !important'
  }
};
class Forgot extends Component {
  state = {
    email: '',
    disabled: false,
    isEmpty: false,
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
    const { email } = this.state;
    e.preventDefault();
    if (email === '') {
      this.setState(prevState => ({
        isEmpty: true
      }));
      return;
    }
    this.setState({
      disabled: true
    });
    axios
      .post('https://api.mjairql.com/api/v2/forgotPassword', {
        email
      })
      .then(response => {
        this.setState({ open: true });
        console.log(response);
      })
      .catch(error =>
        this.setState({ isEmpty: true, disabled: false, open: false })
      );
  };
  handleClose = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };
  render() {
    const { classes } = this.props;
    const { disabled, isEmpty, open } = this.state;
    return (
      <Container className="login-bgImage">
        <Container component="main" maxWidth="xs" className={classes.root}>
          <CssBaseline />
          <div>
            <Typography
              className={classes.typography}
              component="h1"
              variant="h5"
            >
              忘記密碼
            </Typography>
            <p style={{ color: '#666666' }}>
              我們將寄送密碼重設信件至您的電子郵件信箱，點入信件中的驗證連結按鈕後，即可變更您的密碼。
            </p>
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
              {isEmpty ? (
                <p style={{ color: '#f26a55', margin: '10px 0 0' }}>
                  請輸入有效信箱
                </p>
              ) : null}
              <Grid container>
                <Grid item xs={6} className={classes.grid}>
                  <Link to="/login">
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      className={classes.cancel}
                      disabled={disabled}
                    >
                      取消
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={6} className={classes.grid}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={disabled}
                  >
                    {disabled ? '發送中…' : '確認'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
        <Dialog
          open={open}
          sm={true}
          handleClose={this.handleClose}
          text="密碼重設信件已寄出，請至您的信箱進行驗證。"
          buttonText="確認"
        />
      </Container>
    );
  }
}

export default withStyles(styles)(Forgot);
