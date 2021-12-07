import {Picker} from '@react-native-picker/picker';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, StyleSheet, View} from 'react-native';
import {MapType, MapView, Marker} from 'react-native-amap3d';
import {Geolocation, init, setNeedAddress} from 'react-native-amap-geolocation';
import {Toast} from '@ant-design/react-native';
import {CameraPosition} from 'react-native-amap3d/lib/src/types';

export default () => {
  const [mapType, setMapType] = useState(MapType.Standard);
  const [loading, setLoading] = useState(true);
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>();

  const initApp = async () => {
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
    Geolocation.getCurrentPosition(
      position => {
        setCameraPosition({
          target: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          zoom: 15,
        });
        setLoading(false);
      },
      error => {
        // See error code charts below.
        Toast.fail('未打开定位服务:' + error.message);
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    initApp();
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      {!loading && (
        <>
          <MapView style={{flex: 1}} mapType={mapType} initialCameraPosition={cameraPosition}>
            <Marker
              position={cameraPosition?.target}
              onPress={() => alert('onPress')}
              icon={require('../images/flag.png')}
            />
          </MapView>
          <Picker style={{backgroundColor: '#fff'}} selectedValue={mapType} onValueChange={setMapType}>
            <Picker.Item label="标准" value={MapType.Standard} />
            <Picker.Item label="卫星" value={MapType.Satellite} />
            <Picker.Item label="导航" value={MapType.Navi} />
            <Picker.Item label="夜间" value={MapType.Night} />
            <Picker.Item label="公交" value={MapType.Bus} />
          </Picker>
        </>
      )}
    </View>
  );
};
