import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  InteractionManager,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const {width, height} = Dimensions.get('window');

const Height = () => {
  return height;
};

const Width = () => {
  return width;
};

class BarcodeScan extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      transCode: '', // 条码
      typeCode: '', // 条码类型
      showCode: true,
      animateCode: new Animated.Value(0), // 二维坐标
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.startAnimation();
    });
    console.log('进入-------', this.state.showCode);
  }

  // componentWillUnmount() {
  //   this.setState({
  //     showCode: false,
  //   });
  // }

  // 动画开始
  startAnimation() {
    this.state.animateCode.setValue(0);
    Animated.timing(this.state.animateCode, {
      useNativeDriver: true,
      toValue: 1, // 运动终止位置，比值
      duration: 2500, // 动画时长
      easing: Easing.linear, // 线性的渐变函数
      delay: 0.3, // 在一段时间之后开始动画（单位是毫秒），默认为0
    }).start(() => this.startAnimation());
  }

  // TODO 防止重复进入这个方法
  barcodeReceived(e: any) {
    let that = this;
    console.log('barcodeReceived---');
    if (this.state.showCode) {
      if (e.data) {
        that.setState({
          transCode: e.data,
          typeCode: e.type,
          showCode: false,
        });

        let barCodeData = {
          typeName: 'testScan', // TestPage获取此值
          typeValue: e.data,
        };
        that.props.navigation.navigate('ScanResult', {barCodeData});
        that.setState({
          showCode: true,
        });
      }
    }
  }

  // 关闭扫一扫
  // closeScanPage() {
  //   this.props.navigation.navigate('Tab', {screen: 'home'});
  // }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <RNCamera
            onBarCodeRead={this.barcodeReceived.bind(this)}
            onCameraReady={() => {
              console.log('cameraReady ready');
            }}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr, RNCamera.Constants.BarCodeType.ean13]}
            flashMode={RNCamera.Constants.FlashMode.auto}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            style={styles.scan_camera}>
            <View style={styles.scan_cont_box}>
              <View style={styles.scan_cont_circle}>
                <Animated.View
                  style={{
                    alignItems: 'center',
                    transform: [
                      {
                        // translateX: x轴移动
                        // translateY: y轴移动
                        translateY: this.state.animateCode.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 200],
                        }),
                      },
                    ],
                  }}>
                  <Text style={styles.scan_circle_init} />
                </Animated.View>
              </View>
            </View>
            <View style={styles.scan_info_box}>
              <Text style={styles.scan_info}>将条形码放入框内，即可自动扫描</Text>
            </View>
          </RNCamera>
        </SafeAreaView>
      </View>
    );
  }
}

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

export default BarcodeScan;
