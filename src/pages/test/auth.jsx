import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ApiClient from '../../api_client';
import GLOBAL from '../../const/global';

const LoginPage = () => {
  
  const handleLogin = () => {
    data = {
      email: 'williamharris0214@gmail.com',
      password: '123123',
      public_key: 'PUBLIC_KEY_PUBLIC_KEY',
      device_id: '123123123'
    }
    ApiClient.login(data).then((result) => {
      console.log("------Login PROCESS-----", result);
    })
  }

  const handleLoginWithFingerprint = () => {
    data = {
      signed_data: 'SIGNATURE',
      device_id: '123123123'
    }
    ApiClient.login_with_fingerprint(data).then((result) => {
      console.log("------Login With Fingerprint PROCESS-----", result);
    })
  }

  const handleRegister = () => {
    data = {
      email: 'williamharris0214@gmail.com',
      password: '123123',
      first_name: 'William',
      last_name: 'Harris',
      university_name: 'National University of Singapore',
      undergraduate_admission_year: 2016,
      grduation_year: 2020,
      department: 'IT',
      height: 170,
      weight: 120,
      selfie_photo: `file://${GLOBAL.MEDIA.PHOTO_RESUME_URL}`,
      home_address: 'China',
      office_address: '',
      devicie_id: '123123123',
      public_key: 'PUBLIC_KEY_PUBLIC_KEY',
    }
    ApiClient.register(data).then((result) => {
      console.log("------REGISTER PROCESS-----", result);
    })
  }

  const handleUpload = () => {
    const data = {
      file: `file://${GLOBAL.MEDIA.SELFIE_PHOTO.url}`,
      type: 'selfie_photo'
    }
    
    ApiClient.upload_media(data).then((result) => {
      console.log("------ UPLOAD MEDIA PROCESS -----", result);
    })
  }
  return (
    <View style={styles.container}>
      <Box style={styles.buttonContainer}>
        <Button variant='secondary' onPress={() => {handleLogin()}}>
          <ButtonText>Login Test</ButtonText>
        </Button>
        <Button variant='secondary' onPress={() => {handleLoginWithFingerprint()}}>
          <ButtonText>Login With Fingerprint Test</ButtonText>
        </Button>
        <Button variant='secondary' onPress={() => {handleRegister()}}>
          <ButtonText>Register Test</ButtonText>
        </Button>
        <Button variant='secondary' onPress={() => {handleUpload()}}>
          <ButtonText>Upload Profile Test</ButtonText>
        </Button>
      </Box>
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
  logo: {
    width: 250,
    height: 250,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: '100%',
    height: 100,
    marginBottom: 120,
    display: 'flex',
    gap: 10,
  },
});

export default LoginPage;