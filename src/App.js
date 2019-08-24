import React, { Component } from 'react';
import './index.css';
// import NavBar from './components/NavBar/NavBar';
import Chart from './components/Chart';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dashboard from './containers/Dashboard/Dashboard';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Login from './containers/Auth/Login';
import Forgot from './containers/Auth/Forgot';
import Edit from './containers/Auth/Edit';
import History from './containers/History/History';
import Logout from './containers/Auth/Logout';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }
  render() {
    return (
      <BrowserRouter basename="/apexa">
        <Navbar
          isAuthenticate={this.props.isAuthenticate}
          userData={this.props.userData}
        />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/edit" component={Dashboard} />
          <Route path="/logout" component={Logout} />
          <Route path="/history/:address" component={History} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticate: state.auth.token !== null,
    userData:
      state.auth.userData || JSON.parse(localStorage.getItem('userData'))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
