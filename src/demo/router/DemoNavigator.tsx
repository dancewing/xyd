import {Router} from 'types';
const router: Router[] = [
  {
    name: 'AntForm', //跳转路径
    title: 'AntForm', //头部展示标题
    component: require('../views/AntForm').default,
    headerShown: true,
  },
  /*  {
    name: 'FaceDetector_EX',
    title: 'FaceDetector',
    component: require('../views/ex/FaceDetector').default,
    headerShown: true,
  },
  {
    name: 'BaseCamera_EX',
    title: 'CameraScreen',
    component: require('../views/ex/BaseCamera').default,
    headerShown: true,
  },
  {
    name: 'CameraScreenExample',
    title: 'CameraScreenExample',
    component: require('../views/ex/CameraScreenExample').default,
    headerShown: true,
  },
  {
    name: 'BarcodeScan_EX',
    title: 'BarcodeScan',
    component: require('../views/ex/BarcodeScan').default,
    headerShown: true,
  },*/

  {
    name: 'BaseCamera_RN',
    title: 'CameraScreen',
    component: require('../views/rn/BaseCamera').default,
    headerShown: true,
  },
  {
    name: 'FaceDetector_RN',
    title: 'FaceDetector',
    component: require('../views/rn/FaceDetector').default,
    headerShown: true,
  },
  {
    name: 'BarcodeScan_RN',
    title: 'BarcodeScan',
    component: require('../views/rn/BarcodeScan').default,
    headerShown: true,
  },
  {
    name: 'ScanResult',
    title: 'ScanResult',
    component: require('../views/rn/ScanResult').default,
    headerShown: true,
  },
  {
    name: 'GeoTest',
    title: 'GeoTest',
    component: require('../views/geo/GeoTest').default,
    headerShown: true,
  },
  {
    name: 'TraceTest',
    title: 'TraceTest',
    component: require('../views/geo/TraceTest').default,
    headerShown: true,
  },
  {
    name: 'Storage',
    title: 'Storage',
    component: require('../views/Storage').default,
    headerShown: true,
  },
  {
    name: 'amap3d',
    title: '高德地图',
    component: require('demo/views/amap3d/home').default,
    headerShown: true,
  },
  /*  {
    name: 'AliFaceVerify',
    title: 'AliFaceVerify',
    component: require('../views/AliFaceVerify').default,
    headerShown: true,
  },*/
];

export default router;
