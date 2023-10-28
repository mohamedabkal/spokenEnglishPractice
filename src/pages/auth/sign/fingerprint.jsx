import { Button, ButtonText, Text } from '@gluestack-ui/themed';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, Image, Linking, StyleSheet, View } from 'react-native';
import TouchID from 'react-native-touch-id';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../../api_client';
import Shared from '../../../const/shared';
import { useIsForeground } from '../../../hooks/useIsForeground';
import { pushAlert } from '../../../store/alert';
import { setLoadingState } from '../../../store/global';
import util from '../../../utils';

const FingerprintPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const linkTo = useLinkTo();
  const isForeground = useIsForeground()
  const store = useSelector((state) => state.profile)

  const optionalConfigObject = {
    title: 'Please Authenticate', // Android
    imageColor: '#000', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Slightly Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS
  };
  
  useEffect(() => {
    handleAuth();
  }, [])

  const handleAuth = () => {
    TouchID.isSupported()
      .then(biometryType => {
        TouchID.authenticate('', optionalConfigObject)
          .then(() => {
            Alert.alert('FingerPrint Authentication Succeed!');
            handleSignIn();
          })
          .catch(() => {
            Alert.alert('Authentication Failed', '', [
              {text: 'Retry', onPress: handleAuth},
              {text: 'Open Setting', onPress: () => Linking.sendIntent('android.settings.SETTINGS')},
              {text: 'Back', onPress: navigation.goBack},
            ]);
          });
      })
      .catch(error => {
        console.log('Biometric support check error: ', error);
        Alert.alert('An error occurred while checking biometric support', 'Please go to the Setting and confirm your fingerprint', [
          {text: 'Retry', onPress: handleAuth},
          {text: 'Open Setting', onPress: () => Linking.sendIntent('android.settings.SETTINGS')},
          {text: 'Back', onPress: navigation.goBack},
        ]);
      });
  };

  const handleBack = () => {
    handleSignIn();
    // navigation.goBack();
  }

  const handleSignIn = async () => {
    console.log("sign in.....")
    console.log('private key', store.private_key);
    const device_id = await Shared.DeviceInfo.getUniqueId()
    const signed_data = await util.signature(store.private_key);
    console.log("SIGNED_DATA", signed_data);
    dispatch(setLoadingState({flag: true, message: 'Logging in...'}))
    ApiClient.login_with_fingerprint({signed_data, device_id}).then(({error, data}) => {
      console.log("login", error, data);
      dispatch(setLoadingState({flag: false, message: ''}))
      if(error) {
        dispatch(pushAlert({
          type: 'error', 
          title: "Login Failed!", 
          message: error, time: 5}))
        return;
      }
      navigation.replace('Main', { screen: 'Dashboard' });
    }).catch(error => {
      dispatch(setLoadingState({flag: false, message: ''}))
      if(error) {
        return console.log("Login Exception: ", error);
      }
    })
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../assets/img/fingerprint.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>
          Touch the fingerprint sensor to continue
        </Text>
      </View>

      <Button style={styles.back} variant='secondary' onPress={() => {handleBack()}}>
        <ButtonText>Back</ButtonText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20
  },
  logoContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 8,
    resizeMode: 'stretch',
  },
  buttonContainer: {
    width: '100%',
    height: 100,
    marginBottom: 120,
    display: 'flex',
    gap: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 22,
    width: 240,
    // color: '#5CB35E',
    color: 'gray',
    marginTop: 24
  },
  back: {
    width: '100%'
  }
});

export default FingerprintPage;