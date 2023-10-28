import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

const WelcomePage = () => {
  const navigation = useNavigation();
  const linkTo = useLinkTo();
  const store = useSelector((state) => state.profile)
  
  const handleGetStarted = () => {
    linkTo('/SignUp/Register')
  }

  const handleSignIn = () => {
    const private_key = store.private_key;
    if(private_key && private_key.length > 0)
      linkTo('/SignIn/Fingerprint')
    else
      linkTo('/SignIn/Login')
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/img/logo.png')}
          style={styles.logo}
        />
      </View>

      <Box style={styles.buttonContainer}>
        <Button variant='primary' onPress={() => handleGetStarted()}>
          <ButtonText>Get Started</ButtonText>
        </Button>
        <Button variant='secondary' onPress={() => {handleSignIn()}}>
          <ButtonText>Sign In</ButtonText>
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
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default WelcomePage;