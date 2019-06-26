import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import GreenImg from '../../assets/images/bg_g.png';
import BlueImg from '../../assets/images/bg_b.png';
import RedImg from '../../assets/images/bg_red.png';
import YellowImg from '../../assets/images/bg_y.png';
import PurpleImg from '../../assets/images/bg_p.png';
import OrangeImg from '../../assets/images/bg_o.png';
import RedOrangeImg from '../../assets/images/bg_r.png';
import { withStyles } from '@material-ui/styles';

const styles = {
  card: {
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform .3s',
    '&:hover': {
      transform: 'translateY(-3%)',
      transition: 'transform .2s'
    },
    '& p': {
      margin: '5px 0',
      color: '#666666'
    },
    '@media (max-width: 768px)': {
      '& p': {
        fontSize: '14px'
      }
    },
    '@media (max-width: 414px)': {
      '&:hover': {
        transform: 'none',
        transition: 'transform .2s'
      }
    }
  },
  header: {
    height: '80px',
    width: '80px',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#fff',
    margin: '15px 10px 5px',
    '& p': {
      margin: '4px 0',
      fontSize: '14px',
      color: '#fff'
    },
    '& p:nth-child(3)': {
      fontSize: '30px'
    }
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    '& div': {
      '& p': {
        margin: '0',
        fontSize: '18px'
      },
      '& p:nth-child(odd)': {
        fontSize: '12px'
      }
    }
  },
  hr: {
    margin: '20px 0 10px',
    width: '100%',
    border: '.5px solid #d8d8d8'
  }
};

/**
 * 篩選
 * 因應文字及顏色會隨著空污值做變化，將資料結構重新整理，以便好處理。
 * 將父元件傳來的 device 用 for in 跑資料，再利用 switch case 以 key 為條件，之後再針對空污數值
 * 的高低來決定文字及顏色
 */

const screening = device => {
  let upDateDevice = {
    ...device
  };
  for (let key in upDateDevice) {
    switch (key) {
      case 'pm25':
        if (upDateDevice[key] >= 251) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '非常嚴重',
              unit: 'μg/m3',
              urlImg: PurpleImg
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 151 && upDateDevice[key] <= 250) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '嚴重',
              urlImg: RedImg,
              unit: 'μg/m3'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 55 && upDateDevice[key] <= 150) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '重度',
              urlImg: RedOrangeImg,
              unit: 'μg/m3'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 36 && upDateDevice[key] <= 54) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '中度',
              urlImg: OrangeImg,
              unit: 'μg/m3'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 16 && upDateDevice[key] <= 35) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '輕度',
              urlImg: YellowImg,
              unit: 'μg/m3'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 0 && upDateDevice[key] <= 15) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '良好',
              urlImg: GreenImg,
              unit: 'μg/m3'
            }
          };
          upDateDevice = newDevice;
        }
        break;
      case 'pm10':
        if (upDateDevice[key] >= 425) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '非常嚴重',
              unit: 'μg/m3',
              urlImg: PurpleImg
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 355 && upDateDevice[key] <= 424) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '嚴重',
              urlImg: RedImg,
              unit: 'μg/m3'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 255 && upDateDevice[key] <= 354) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '重度',
              urlImg: RedOrangeImg,
              unit: 'μg/m3'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 126 && upDateDevice[key] <= 254) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '中度',
              urlImg: OrangeImg,
              unit: 'μg/m3'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 55 && upDateDevice[key] <= 125) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '輕度',
              urlImg: YellowImg,
              unit: 'μg/m3'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 0 && upDateDevice[key] <= 54) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '良好',
              urlImg: GreenImg,
              unit: 'μg/m3'
            }
          };
          upDateDevice = newDevice;
        }
        break;
      case 'eco2':
        if (upDateDevice[key] >= 1501) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '不舒適',
              unit: 'ppm',
              urlImg: RedOrangeImg
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 0 && upDateDevice[key] <= 1500) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '舒適',
              urlImg: GreenImg,
              unit: 'ppm'
            }
          };
          upDateDevice = newDevice;
        }
        break;
      case 'humidity':
        if (upDateDevice[key] >= 26) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '炎熱/潮濕',
              unit: '%',
              urlImg: RedOrangeImg
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 18 && upDateDevice[key] <= 25) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '舒適',
              urlImg: GreenImg,
              unit: '%'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 0 && upDateDevice[key] <= 17) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '寒冷/乾燥',
              urlImg: BlueImg,
              unit: '%'
            }
          };
          upDateDevice = newDevice;
        }
        break;
      case 'temperature':
        if (upDateDevice[key] >= 65) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '炎熱/潮濕',
              unit: '°C',
              urlImg: RedOrangeImg
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 46 && upDateDevice[key] <= 64) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '舒適',
              urlImg: GreenImg,
              unit: '°C'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 0 && upDateDevice[key] <= 45) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '寒冷/乾燥',
              urlImg: BlueImg,
              unit: '°C'
            }
          };
          upDateDevice = newDevice;
        }
        break;
      case 'tvoc':
        if (upDateDevice[key] >= 20001) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '非常嚴重',
              unit: 'ppb',
              urlImg: PurpleImg
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 5501 && upDateDevice[key] <= 20000) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '嚴重',
              urlImg: RedImg,
              unit: 'ppb'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 2201 && upDateDevice[key] <= 5500) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '重度',
              urlImg: RedOrangeImg,
              unit: 'ppb'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 661 && upDateDevice[key] <= 2200) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '中度',
              urlImg: OrangeImg,
              unit: 'ppb'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 221 && upDateDevice[key] <= 660) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '輕度',
              urlImg: YellowImg,
              unit: 'ppb'
            }
          };
          upDateDevice = newDevice;
        } else if (upDateDevice[key] >= 0 && upDateDevice[key] <= 220) {
          const newDevice = {
            ...upDateDevice,
            [key]: {
              value: upDateDevice[key],
              text: '良好',
              urlImg: GreenImg,
              unit: 'ppb'
            }
          };
          upDateDevice = newDevice;
        }
        break;
      default:
        return upDateDevice;
    }
  }
  return upDateDevice;
};

const Device = ({ device, classes }) => {
  const upDateDevice = screening(device);
  console.log(upDateDevice);
  return (
    <Grid item md={4} sm={6} xs={12}>
      <Link
        to={`/history/${upDateDevice.mac_address}`}
        style={{ textDecoration: 'none' }}
      >
        <Card className={classes.card}>
          <div
            style={{
              backgroundImage: `url(${upDateDevice.pm25.urlImg})`,
              height: '180px',
              width: '180px'
            }}
            className={classes.header}
          >
            <p>PM2.5</p>
            <p>細懸浮微粒</p>
            <p>{upDateDevice.pm25.value}</p>
            <p>{upDateDevice.pm25.unit}</p>
            <p>{upDateDevice.pm25.text}</p>
          </div>
          <div className={classes.content}>
            <div
              style={{
                backgroundImage: `url(${upDateDevice.tvoc.urlImg})`
              }}
              className={classes.header}
            >
              <p>TVOC</p>
              <p>{upDateDevice.tvoc.value}</p>
              <p>{upDateDevice.tvoc.unit}</p>
            </div>
            <div
              style={{
                backgroundImage: `url(${upDateDevice.pm10.urlImg})`
              }}
              className={classes.header}
            >
              <p>PM10</p>
              <p>{upDateDevice.pm10.value}</p>
              <p>{upDateDevice.pm10.unit}</p>
            </div>
            <div
              style={{
                backgroundImage: `url(${upDateDevice.eco2.urlImg})`
              }}
              className={classes.header}
            >
              <p>eCO2</p>
              <p>{upDateDevice.eco2.value}</p>
              <p>{upDateDevice.eco2.unit}</p>
            </div>
          </div>
          <div className={classes.content}>
            <div
              style={{
                backgroundImage: `url(${upDateDevice.temperature.urlImg})`
              }}
              className={classes.header}
            >
              <p>溫度</p>
              <p>{upDateDevice.temperature.value}</p>
              <p>{upDateDevice.temperature.unit}</p>
            </div>
            <div
              style={{
                backgroundImage: `url(${upDateDevice.humidity.urlImg})`
              }}
              className={classes.header}
            >
              <p>濕度</p>
              <p>{upDateDevice.humidity.value}</p>
              <p>{upDateDevice.humidity.unit}</p>
            </div>
          </div>
          <hr className={classes.hr} />
          <p>{upDateDevice.mac_address}</p>
          <p>最後更新時間： {upDateDevice.created_at}</p>
        </Card>
      </Link>
    </Grid>
  );
};

export default withStyles(styles)(Device);
