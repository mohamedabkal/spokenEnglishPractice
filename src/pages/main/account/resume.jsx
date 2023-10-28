import { Box, ScrollView } from '@gluestack-ui/themed';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import GLOBAL from '../../../const/global';

let screenWidth = Dimensions.get('window').width;

const ListItem = ({text, onPress, checked}) => {
  console.log("checked", checked)
  return (
  <Box style={listItemStyles.box}>
    <TouchableRipple onPress={onPress} style={{flex: 1}}>
      <Box style={listItemStyles.item}>
        <Text style={listItemStyles.text}>{text}</Text>
        {
          checked ? (
          <Image
            source={require('../../../../assets/img/check.png')}
            style={{  height: 20, width: 20, borderRadius: 10, marginLeft: 20}}
          />
          ) : null
        }
      </Box>
    </TouchableRipple>
    
  </Box>
  )
}

const listItemStyles = StyleSheet.create({
  text: {
    fontSize: 18,
    height: 48,
    lineHeight: 48,
    paddingLeft: 10,
    flex: 1,
  },
  item: {
    diplay: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: screenWidth-20,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default ({navigation}) => {
  
  const dispatch = useDispatch()
  const store = useSelector((state) => state.profile)

  const handleSelfie = () => {
    navigation.navigate('Preview', {type: GLOBAL.MEDIA.SELFIE_LANDSCAPE_PHOTO})
  }

  const handleBio = () => {
    navigation.navigate('Preview', {type: GLOBAL.MEDIA.SELFIE_BIO_VIDEO})
  }

  const handleIntro = () => {
    navigation.navigate('Preview', {type: GLOBAL.MEDIA.SELFIE_BODY_VIDEO})
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.area}>
        <View style={styles.view}>
          <ListItem text='Selfie Photo' onPress={() => handleSelfie()} checked={store.selfie_photo.length > 0} />
          <ListItem text='Bio Video' onPress={() => handleBio()}  checked={store.face_video.length > 0}/>
          <ListItem text='Introduction Video' onPress={() => handleIntro()}  checked={store.body_video.length > 0}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  area: {
    backgroundColor:'white',
    
  },
  view: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    fontSize: 42
  },
  button: {
    width: '100%'
  }
})
