import { Box, Button, ButtonText, Input, InputField, Text } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLinkTo } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { setLoadingState } from '../../../store/global';
import { updateProfile } from "../../../store/profile";
import util from '../../../utils';
const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});


export default () => {  
  const dispatch = useDispatch()
  const store = useSelector((state) => state.profile)

  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

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
      confirm_password: ''
    },
  });

  const handleRegister = async (formData) => {
    const email = formData.email;
    const password = formData.password;
    dispatch(setLoadingState({flag: true, message: 'Processing...'}))
    const [privateKey, publicKey] = await util.generateKey();
    dispatch(setLoadingState({flag: false, message: ''}))

    dispatch(updateProfile({
      email: email,
      password: password,
      private_key: privateKey,
      public_key: publicKey,
    }));

    linkTo('/SignUp/Congratulations')
  }

  return (
    <KeyboardAwareScrollView style={styles.area}>
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

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input variant="primary" style={styles.input}>
                <InputField secureTextEntry={true} placeholder="Confirm Password" onChangeText={onChange} />
              </Input>
            )}
            name="confirm_password"
          />
          {errors.confirm_password && <Text style={styles.error}>{errors.confirm_password.message}</Text>}

          <Button variant='secondary' onPress={handleSubmit(handleRegister)}>
            <ButtonText>Register</ButtonText>
          </Button>
        </Box>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  area: {
    backgroundColor: 'white'
  },
  container: {
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
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
    display: 'flex',
    gap: 10,
  },
  error: {
    color: 'red',
    paddingLeft: 20,
    marginTop: -10,
    fontSize: 11
  }
});
