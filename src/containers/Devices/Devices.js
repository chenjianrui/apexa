import React, { Component } from 'react';
import Device from '../../components/Device/Device';
import { fetchDevices } from '../../store/actions/devices';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/styles';

const MyCircularProgress = styled(CircularProgress)({
  color: '#48cfae'
});

class Devices extends Component {
  componentDidMount() {
    this.props.fetchDevices();
  }
  render() {
    const { loading, allDeviceList } = this.props;
    let devicesList = allDeviceList.map((device, index) => (
      <Device device={device} key={index} />
    ));
    if (loading) {
      devicesList = (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <MyCircularProgress />
        </div>
      );
    }
    return (
      <Container style={{ marginTop: '35px' }}>
        <Grid container spacing={4}>
          {devicesList}
        </Grid>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    loading: state.devices.loading,
    allDeviceList: state.devices.allDeviceList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDevices: () => dispatch(fetchDevices())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Devices);
