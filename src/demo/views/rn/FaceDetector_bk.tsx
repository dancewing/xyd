import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View, Platform, Text, YGValue} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Icon} from '@ant-design/react-native';

export default class FaceDetector extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      barcodesDetectFlag: false,
      base64: '',
      imageReady: false,
      type: RNCamera.Constants.Type.back,
      faceStyle: null,
    };
  }

  flipCamera = () =>
    this.setState({
      type:
        this.state.type === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back,
    });

  goToDetect() {
    this.setState({
      barcodesDetectFlag: false,
      imageReady: false,
    });
  }

  render() {
    if (this.state.barcodesDetectFlag && this.state.imageReady) {
      const baseImg = `data:image/png;base64,${this.state.base64}`;
      return (
        <View style={styles.container}>
          <Image style={styles.previewImage} source={{uri: baseImg}} />
          <View style={styles.bottomButtons}>
            <TouchableOpacity onPress={() => this.goToDetect()} style={styles.recordingButton}>
              <Icon name="camera" size={50} color="orange" />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={this.state.type}
            flashMode={RNCamera.Constants.FlashMode.on}
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
            faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
            onFaceDetectionError={() => {
              console.log('face detector error');
            }}
            onFacesDetected={({faces}) => {
              console.log(faces.length);
              if (!this.state.barcodesDetectFlag && faces.length > 0) {
                //this.takePicture();
                console.log(faces[0]);
                const bounds = faces[0].bounds;
                console.log('width: ' + Width());
                console.log('height: ' + Height());
                const faceStyle = StyleSheet.create({
                  faceStyle: {
                    position: 'absolute',
                    left: bounds.origin.x.toFixed() + 'pt',
                    top: bounds.origin.y.toFixed() + 'pt',
                    width: bounds.size.width.toFixed() + 'pt',
                    height: bounds.size.height.toFixed() + 'pt',
                    borderWidth: 1,
                    borderColor: '#00ff00',
                  },
                });
                this.setState({
                  faceStyle: faceStyle.faceStyle,
                });
                console.log(this.state.faceStyle);
              } else {
                this.setState({
                  faceStyle: null,
                });
              }
            }}>
            <View style={styles.face_info_box}>
              <View style={styles.face_cont_circle} />
              {this.state.faceStyle && <View style={this.state.faceStyle} />}
            </View>
          </RNCamera>
          <View style={styles.bottomButtons}>
            <TouchableOpacity onPress={() => this.flipCamera()} style={styles.flipButton}>
              <Icon name="play-circle" size={35} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  takePicture = async () => {
    if (this.camera) {
      this.setState({
        barcodesDetectFlag: true,
      });
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        base64: data.base64,
        imageReady: true,
      });
    }
  };
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
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  topButtons: {
    flex: 1,
    width: Width(),
    alignItems: 'flex-start',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Height(),
  },
  flipButton: {
    marginBottom: 20,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    width: Width(),
    alignItems: 'center',
  },
  recordingButton: {
    marginBottom: 10,
  },
  previewImage: {
    margin: 10,
    width: Width(),
    minHeight: Width(),
  },
  face_info_box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  face_cont_circle: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 260,
    height: 260,
    borderWidth: 1,
    borderColor: '#919191',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});
