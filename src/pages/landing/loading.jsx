import { useLinkTo, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import GLOBAL from '../../const/global';
import Shared from '../../const/shared';
import { updateProfile } from '../../store/profile';

const LoadingPage = () => {

  const navigation = useNavigation();
  const linkTo = useLinkTo();
  const dispatch = useDispatch()

  useEffect(() => {
    
    Shared.SharedPreferences.getItem(GLOBAL.USER_PREFERENCE, (data) => {
      console.log('...load profile', data)
      dispatch(updateProfile(JSON.parse(data)));
    })
    
    const timer = setTimeout(() => {
      navigation.replace('Welcome')
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/img/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='120' color="#555555" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    borderRadius: 8,
    paddingTop: -100,
    resizeMode: 'contain',
  },
  loadingContainer: {
    marginBottom: 120,
    height: 100
  },
});

export default LoadingPage;