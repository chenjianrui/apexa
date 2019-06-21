import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Logo from '../../assets/images/addwii_logo.svg';
import avatarImg from '../../assets/images/avatar.png';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
    '& span': {
      color: '#666666'
    }
  },
  logo: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center'
    }
  },
  avatar: {
    margin: 10,
    width: '30px',
    height: '30px'
  },
  userMenu: {
    cursor: 'pointer',
    padding: '20px 0'
  },
  menu: {
    '& a': {
      textDecoration: 'none',
      color: '#666666'
    },
    '& a:nth-child(3)': {
      color: '#00cccc'
    }
  }
};
class NavBar extends Component {
  state = {
    open: false,
    menuEvent: null
  };
  handleClick = e => {
    this.setState({
      menuEvent: e.currentTarget
    });
  };
  handleClose = () => {
    this.setState({
      menuEvent: null
    });
  };
  render() {
    const { classes, isAuthenticate, userData } = this.props;
    const userInfo = isAuthenticate ? (
      <>
        <Avatar
          src={userData.imgUrl.small || avatarImg}
          alt="avatar"
          className={classes.avatar}
        />
        <span onClick={this.handleClick} className={classes.userMenu}>
          {userData.email.split('@')[0]}
        </span>
        <Menu
          id="user-menu"
          anchorEl={this.state.menuEvent}
          open={Boolean(this.state.menuEvent)}
          onClose={this.handleClose}
          className={classes.menu}
        >
          <Link to="/">
            <MenuItem onClick={this.handleClose}>匯出數據</MenuItem>
          </Link>
          <Link to="/edit">
            <MenuItem onClick={this.handleClose}>更改密碼</MenuItem>
          </Link>
          <Link to="/logout">
            <MenuItem onClick={this.handleClose}>登出</MenuItem>
          </Link>
        </Menu>
      </>
    ) : null;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography className={classes.logo}>
              <Link to="/">
                <img className="logo" src={Logo} alt="" />
                <span style={{ paddingLeft: 10 }}>ADDWII</span>
              </Link>
            </Typography>
            {userInfo}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
