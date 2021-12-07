module.exports = {
  // dependency: {
  //   platforms: {
  //     ios: {project: 'lib/ios/react-native-amap-geolocation.podspec'},
  //     android: {sourceDir: 'lib/android'},
  //   },
  // },
  dependencies: {
    'react-native-amap-geolocation': {
      root: __dirname,
      platforms: {
        ios: {
          podspecPath: __dirname + '/plugins/react-native-amap-geolocation/ios/react-native-amap-geolocation.podspec',
        },
        android: {
          sourceDir: __dirname + '/plugins/react-native-amap-geolocation/android',
          packageImportPath: 'import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;',
          packageInstance: 'new AMapGeolocationPackage()',
        },
      },
    },
  },
};
