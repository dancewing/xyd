import * as React from 'react';
import {ScrollView} from 'react-native';
import {Button, List} from '@ant-design/react-native';
import {Props} from 'types';

export default function Home(props: Props) {
  return (
    <ScrollView>
      <Button onPress={() => props.navigation.navigate('AntForm')}>Antd Mobile RN - From</Button>
{/*      <List renderHeader="EX Camera">
        <Button onPress={() => props.navigation.navigate('BaseCamera_EX')}>EX Base Camera</Button>
        <Button onPress={() => props.navigation.navigate('FaceDetector_EX')}>EX Face Detector</Button>
        <Button onPress={() => props.navigation.navigate('BarcodeScan_EX')}>EX BarcodeScan</Button>
        <Button onPress={() => props.navigation.navigate('CameraScreenExample')}>CameraScreenExample</Button>
      </List>*/}
      <List renderHeader="RN Camera">
        <Button onPress={() => props.navigation.navigate('BaseCamera_RN')}>RN Base Camera</Button>
        <Button onPress={() => props.navigation.navigate('FaceDetector_RN')}>RN Face Detector</Button>
        <Button onPress={() => props.navigation.navigate('BarcodeScan_RN')}>RN BarcodeScan</Button>
      </List>
      {/*<Button onPress={() => props.navigation.navigate('AliFaceVerify')}>AliFaceVerify</Button>*/}
      <Button onPress={() => props.navigation.navigate('GeoTest')}>GeoLocation</Button>
      <Button onPress={() => props.navigation.navigate('TraceTest')}>轨迹记录</Button>
      <Button onPress={() => props.navigation.navigate('amap3d')}>高德地图</Button>
    </ScrollView>
  );
}
