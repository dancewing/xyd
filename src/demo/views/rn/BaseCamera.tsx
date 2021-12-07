import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Icon} from '@ant-design/react-native';

class PhotoCamera extends React.PureComponent<any> {
  state = {
    type: RNCamera.Constants.Type.back,
  };

  flipCamera = () =>
    this.setState({
      type:
        this.state.type === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back,
    });

  takePhoto = async () => {
    const {onTakePhoto} = this.props;
    const options = {
      quality: 0.5,
      base64: true,
      width: 300,
      height: 300,
    };
    const data = await this.camera.takePictureAsync(options);
    if (onTakePhoto) {
      onTakePhoto(data.base64);
    }
  };
  render() {
    const {type} = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={cam => {
            this.camera = cam;
          }}
          type={type}
          style={styles.preview}
        />
        <View style={styles.topButtons}>
          <TouchableOpacity onPress={this.flipCamera} style={styles.flipButton}>
            <Icon name="play-circle" size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomButtons}>
          <TouchableOpacity onPress={this.takePhoto} style={styles.recordingButton}>
            <Icon name="camera" size={50} color="orange" />
          </TouchableOpacity>
        </View>
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
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    height: Height(),
  },
  topButtons: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: Width(),
    alignItems: 'flex-start',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    width: Width(),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  flipButton: {
    flex: 1,
    marginTop: 20,
    right: 20,
    alignSelf: 'flex-end',
  },
  recordingButton: {
    marginBottom: 10,
  },
});

export default PhotoCamera;
