import { Button, ButtonText } from '@gluestack-ui/themed';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import GLOBAL from '../../../const/global';

export default SelfiePreview = ({navigation, route}) => {

  const handleNext = () => {
    navigation.navigate('Register Fingerprint');
  }

  return (
    <SafeAreaView style={styles.resume_preview}>
      <Image
        source={{uri: `file://${GLOBAL.MEDIA.SELFIE_PHOTO.url}`}}
        style={styles.photo}
        resizeMode="contain"
      />
      <Button style={styles.next} variant='primary' onPress={handleNext}>
        <ButtonText>Next</ButtonText>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resume_preview: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    display: 'flex'
  },
  photo: {
    width: '100%',
    flex: 1,
    backgroundColor: 'black',
  },
  next: {
    margin: 10
  }
})
