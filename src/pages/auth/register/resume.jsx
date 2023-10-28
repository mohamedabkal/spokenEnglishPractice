import { Box, Button, ButtonText, CloseIcon, Icon, View } from '@gluestack-ui/themed';
import { useRef, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, presentationStyle } from 'react-native';
import ImageView from "react-native-image-viewing";
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import { useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default Resume = ({navigation}) => {

  const store = useSelector((state) => state.register)

  const handleNext = () => {
    console.log("next")
    navigation.navigate('Payment Select');
  }
  return (
      <View style={styles.area}>
        <View style={styles.inner}>
          <View style={styles.preview}>
            <ImagePreview uri={store.photo} />
            <VideoPreview uri={store.video} />
          </View>
          <Button variant='secondary' onPress={handleNext}>
            <ButtonText>Next</ButtonText>
          </Button>
        </View>
      </View>
  );
};

const ImagePreview = ({uri}) => {
  const [visible, setIsVisible] = useState(false);

  openImage = () => {
    setIsVisible(true)
  }

  return (
    <View style={styles.resume_preview}>
      <Text style={styles.caption}>Photo</Text>
      <TouchableOpacity onPress={openImage} activeOpacity={0.9}>
        <Image
          source={{uri: `file://${uri}`}}
          style={styles.photo} // Set the desired width and height of the image
          resizeMode="contain" // Choose the desired resizeMode (e.g., 'contain', 'cover', 'stretch')
        />
      </TouchableOpacity>
      <ImageView
        images={[{
          uri: `file://${uri}`,
        }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

const VideoPreview = ({uri}) => {

  const [isLive, setIsLive] = useState(false);
  const liveVideoRef = useRef();

  const openVideo = () => {
    setIsLive(true)
  }

  const closeVideo = () => {
    setIsLive(false)
  }

  return (
    <Box style={styles.resume_preview}>
      <Text style={styles.caption}>Video</Text>
      <TouchableOpacity onPress={openVideo} activeOpacity={0.9}>
        <Video
          source={{uri: `file://${uri}`}}
          style={styles.photo}
          resizeMode="contain"
          repeat={true}
          paused={isLive}
        />
      </TouchableOpacity>
      <Modal transparent={presentationStyle === "overFullScreen"} visible={isLive}>
        <VideoPlayer
            source={{uri: `file://${uri}`}}
            style={styles.video}
            resizeMode="contain"
            controls={true}
            disableBack
            disableFullscreen
          />
          <TouchableOpacity onPress={closeVideo} activeOpacity={0.9} style={{display: 'absolute', left: screenWidth-30, top: 10}}>
            <Icon as={CloseIcon} w="$6" h="$6" style={{color: 'white'}}/>
          </TouchableOpacity>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  full: {
    position: 'absolute',
    backgroundColor: 'black',
    left: 0, top: 0, right: 0, bottom: 0
  },
  area: {
    backgroundColor:'white',
    flex: 1
  },
  inner: {
    padding: 24,
    backgroundColor:'white',    
  },
  preview: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    marginBottom: 20,
  },
  resume_preview: {
    backgroundColor: '#cccccc11',
    width: 120,
    height: 140,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cccccc66',
    display: 'flex',
    alignItems: 'center',
    margin: 20
  },
  caption: {
    fontSize: 11,
    marginTop: 5,
    marginBottom: 5,
  },
  photo: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    borderRadius: 3
  },
  video: {
    backgroundColor: 'black',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  }
})
