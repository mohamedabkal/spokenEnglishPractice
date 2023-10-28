import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default () => {
  
  const navigation = useNavigation();

  const handleAccount = () => {
    navigation.navigate('Account')
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
        <Button variant='primary' onPress={() => handleAccount()}>
          <ButtonText>Account</ButtonText>
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
    marginTop: 20
  },
});
