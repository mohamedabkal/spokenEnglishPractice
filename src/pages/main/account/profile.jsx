import { Box, ScrollView } from '@gluestack-ui/themed';
import { useLinkTo } from '@react-navigation/native';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import GLOBAL from '../../../const/global';

const Selfie = () => {
  return (<Avatar.Image style={{marginBottom: 20}} size={100} source={{uri: `file://${GLOBAL.MEDIA.SELFIE_PHOTO.url}`}} />)
}

let screenWidth = Dimensions.get('window').width;

const ProfileItem = ({label, value}) => {
  return (
  <Box style={profileStyles.box}>
    <Text style={profileStyles.label}>{label}</Text>
    <TouchableOpacity onPress={() => {console.log("A")}}>
      <Text style={profileStyles.value}>{value}</Text>
    </TouchableOpacity >
  </Box>
  )
}

const profileStyles = StyleSheet.create({
  label: {
    color: '#5CB35E',
    fontSize: 14
  },
  value: {
    fontSize: 16,
    height: 48,
    lineHeight: 48
  },
  box: {
    width: screenWidth-20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  }
})


export default ({navigation}) => {
  const linkTo = useLinkTo();
  const dispatch = useDispatch()
  const store = useSelector((state) => state.profile)
  console.log("STORE", store);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.area}>
        <View style={styles.view}>
          <Selfie />
          <ProfileItem label='First Name' value={store.first_name} />
          <ProfileItem label='Last Name' value={store.last_name} />
          <ProfileItem label='Email' value={store.email} />
          <ProfileItem label='Mobile Number' value={store.mobile_number} />
          <ProfileItem label='University/Institution Name' value={store.university_institution_name} />
          <ProfileItem label='Undergraduate Admission' value={store.undergraduate_admission_year} />
          <ProfileItem label='Graduation Year' value={store.graduation_year} />
          <ProfileItem label='Department' value={store.department} />
          <ProfileItem label='Height' value={store.height} />
          <ProfileItem label='Weight' value={store.weight} />

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
    marginTop: 20,
    marginBottom: 20,
    padding: 10
  },
  inner: {
    padding: 24,
    backgroundColor:'white'
  },
  text: {
    fontSize: 42
  },
  button: {
    width: '100%'
  }
})
