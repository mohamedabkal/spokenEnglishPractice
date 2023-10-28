import { Box, Button, ButtonText, Input, InputField } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import ApiClient from '../../../api_client';
import GLOBAL from '../../../const/global';
import Shared from '../../../const/shared';
import { pushAlert } from '../../../store/alert';
import { setLoadingState } from '../../../store/global';
import util from '../../../utils';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password must contain at least 8 characters'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const linkTo = useLinkTo();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (formData) => {
    dispatch(setLoadingState({flag: true, message: 'Generating Keys...'}))
    const [private_key, public_key] = await util.generateKey();
    const email = formData.email;
    const password = formData.password;
    const device_id = await Shared.DeviceInfo.getUniqueId();
    
    dispatch(setLoadingState({flag: true, message: 'Logging in...'}))
    ApiClient.login({email, password, public_key, device_id}).then(({error, data}) => {
      console.log("login", error, data);
      dispatch(setLoadingState({flag: false, message: ''}))
      if(error) {
        dispatch(pushAlert({
          type: 'error', 
          title: "Login Failed!", 
          message: error, time: 5}))
        return;
      }
      Shared.SharedPreferences.getItem(GLOBAL.USER_PREFERENCE, profile => {
        Shared.SharedPreferences.setItem(GLOBAL.USER_PREFERENCE, JSON.stringify({
          ...JSON.parse(profile),
          ...data,
          private_key,
          public_key,
        }));
      });
      linkTo('/Main/Dashboard')
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
          source={require('../../../../assets/img/logo.png')}
          style={styles.logo}
        />
      </View>

      <Box style={styles.buttonContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input variant="primary" style={styles.input}>
              <InputField placeholder="Email" value={value} onChangeText={onChange} />
            </Input>
          )}
          name="email"
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
        
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input variant="primary" style={styles.input}>
              <InputField secureTextEntry={true} placeholder="Password" onChangeText={onChange} />
            </Input>
          )}
          name="password"
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

          
        <Button variant='secondary' onPress={handleSubmit(handleLogin)}>
          <ButtonText>Login</ButtonText>
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
    height: 150,
    marginBottom: 120,
    display: 'flex',
    gap: 10,
  },
  input: {
    marginBottom: 0
  },
  error: {
    color: 'red',
    paddingLeft: 20,
    marginTop: -10,
    fontSize: 11
  }
});

export default LoginPage;