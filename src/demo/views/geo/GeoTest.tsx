import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, Platform, PermissionsAndroid} from 'react-native';
import {Button, Toast} from '@ant-design/react-native';
import {Geolocation, setLocatingWithReGeocode, setNeedAddress, init} from 'react-native-amap-geolocation';

class GeoTest extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
      coords: null,
      address: null,
    };
  }

  async componentDidMount() {
    // 使用自己申请的高德 App Key 进行初始化
    await init({
      ios: '74cb6e664ddd20104732518c5a326329',
      android: 'f26161f838bb5a3416969c085f1bb6c0',
    });
    if (Platform.OS === 'android') {
      // 对于 Android 需要自行根据需要申请权限
      setNeedAddress(true);
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
    }
  }

  async getGeoLocation() {
    const this_ = this;
    //const hasLocationPermission = await this.hasLocationPermission();
    if (true) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          this_.setState({
            coords: position.coords,
          });
          if (position.location.regeo) {
            this.setState({
              address: position.location.regeo.address,
            });
          }
        },
        error => {
          // See error code charts below.
          Toast.fail('未打开定位服务:' + error.message);
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }

  async hasLocationPermission() {
    if (Platform.OS === 'ios') {
      const result = await Geolocation.requestAuthorization('whenInUse');
      if (result !== 'granted') {
        Toast.fail('请启用定位服务');
        return false;
      }
    }
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scan_info_box}>
          <Button onPress={() => this.getGeoLocation()}>记录轨迹</Button>
        </View>
        <Text>坐标数据：</Text>
        {this.state.coords && (
          <>
            <Text>经度:{this.state.coords.longitude}</Text>
            <Text>纬度:{this.state.coords.latitude}</Text>
          </>
        )}
        {this.state.address && (
          <>
            <Text>地址:{this.state.address}</Text>
          </>
        )}
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');

const Height = () => {
  return height;
};

const Width = () => {
  return width;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scan_top_box: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 24,
    height: 24,
  },
  scan_camera: {
    flex: 1,
    height: Height(),
  },
  scan_cont_box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scan_cont_circle: {
    width: 260,
    height: 260,
    borderWidth: 1,
    borderColor: '#919191',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  scan_circle_init: {
    width: 250,
    height: 1,
    backgroundColor: '#00ff00',
  },
  scan_info_box: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    width: Width(),
  },
  scan_info: {
    color: '#fff',
  },
  info: {
    width: Width(),
    height: 80,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingBottom: 5,
    justifyContent: 'space-around',
  },
});

export default GeoTest;
