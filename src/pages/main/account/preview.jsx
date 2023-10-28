import { View } from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
import { Appbar, Menu } from 'react-native-paper';
import ApiClient from '../../../api_client';

// import Orientation from 'react-native-orientation';
import { useIsFocused } from '@react-navigation/core';
import Video from "react-native-video";
import GLOBAL from '../../../const/global';
import Shared from '../../../const/shared';
import { useIsForeground } from '../../../hooks/useIsForeground';

import { useDispatch } from 'react-redux';
import { setLoadingState } from '../../../store/global';
import { updateProfile } from '../../../store/profile';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const PreviewHeader = ({type, onAction, onUpload, onBack}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const Camera = () => {
    closeMenu();
    onAction();
  }

  const Upload = () => {
    closeMenu();
    onUpload();
  }

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content title={type.title} style={{ alignItems: 'center' }} />
      <Menu
          visible={visible}
          onDismiss={closeMenu}
          animation={false}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={openMenu}
            />
          }>
          <Menu.Item
            leadingIcon="camera"
            onPress={Camera}
            title="Camera"
          />
          <Menu.Item
            leadingIcon="upload"
            onPress={Upload}
            title="Upload"
          />
        </Menu>
    </Appbar.Header>
  )
}

const previewHeaderStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    overflow: 'visible'
  },
  menu: {

  },
  back: {

  },
  rightBox: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row-reverse'
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,

  },
  action: {

  },
  button: {
    marginLeft: 10
  }
})

const TARGET_DIR = RNFS.PicturesDirectoryPath + "/SpokenEnglishPractice";
const VIDEO_RESUME_URL = `${TARGET_DIR}/RESUME_VIDEO.mp4`
const PHOTO_RESUME_URL = `${TARGET_DIR}/RESUME_PHOTO.png`

export default Resume = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [type] = useState(route.params.type ?? GLOBAL.MEDIA.SELFIE_LANDSCAPE_PHOTO)
  const isFocussed = useIsFocused()
  const isForeground = useIsForeground()
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Orientation.lockToPortrait();
    setVisible(isFocussed && isFocussed);
  }, [isFocussed, isForeground])

  const onAction = () => {
    setPaused(false);
    setVisible(false);
    setTimeout(() => {
      navigation.navigate('Camera', { type })
    }, 200)
  }

  const onUpload = () => {
    const data = {
      file: `file://${type.url}`,
      type: type.feature
    }
    dispatch(setLoadingState({flag: true, message: 'Uploading...'}))
    ApiClient.upload_media(data).then((result) => {
      dispatch(setLoadingState({flag: false, message: ''}))
      console.log("------ UPLOAD MEDIA PROCESS -----", result);
      dispatch(updateProfile({
        [type.feature]: type.url
      }))
      Shared.SharedPreferences.getItem(GLOBAL.USER_PREFERENCE, data => {
        Shared.SharedPreferences.setItem(GLOBAL.USER_PREFERENCE, JSON.stringify({
          ...JSON.parse(data),
          [type.feature]: type.url
        }));
      });

      
    })
  }

  console.log(type);

  return (
    <View style={styles.resume_preview}>
      <PreviewHeader type={type} 
        onBack={() => {navigation.goBack()}}
        onAction={onAction}
        onUpload={onUpload} />

      {!visible ? <></> : 
        type.type != 'photo' ? 
          (<Video
            style={styles.video}
            resizeMode="contain"
            controls = {true}
            paused = {paused}
            source={{uri: `file://${type.url}`}}
          />) : 
          (<Image
            source={{uri: `file://${type.url}`}}
            style={styles.photo}
            resizeMode="contain"
          />)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  resume_preview: {
    backgroundColor: 'black',
    width: screenWidth,
    height: screenHeight,
    display: 'flex'
  },
  photo: {
    width: '100%',
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    backgroundColor: 'black',
    width: '100%',
    flex: 1,
  }
})
