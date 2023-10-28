import { Box, Button, ButtonText, Text, View } from '@gluestack-ui/themed';
import { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import InfomDlg from '../../../components/dialog/inform_dlg';

const PaymentOption = ({Title, Logo, Active, OnActive}) => {
  return (
    <Box style={{...PaymentOptionStyles.container, borderColor: Active ? '#5CB35E' :'gray'}}
    onTouchEndCapture={OnActive}>
      <Text style={PaymentOptionStyles.text}>{Title}</Text>
      <Image
        source={Logo}
        style={{height: 40, width: 60}}
      />
    </Box>
  )
}

const PaymentOptionStyles = StyleSheet.create({
  container: {
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 1.4,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    padding: 16,
    backgroundColor: 'white'
  },
  text: {
    flex: 1,
    color: 'gray',
    fontWeight: 'bold'
  }
})

export default ({navigation}) => {
  const [showAlertDialog, setShowAlertDialog] = useState(true)
  const [active, setActive] = useState(0);

  const SelectPayment = (index) => {
    setActive(index)
  }

  const handleNext = () => {
    navigation.navigate('Payment Detail', { detailType: active == 2 ? 'paypal' : 'card' });
  }

  return (
    <View style={styles.container}>
      <PaymentOption Title="VISA Card" Active={active == 0} Logo={require('../../../../assets/img/logo_visa.jpg')} OnActive={() => SelectPayment(0)}/>
      <PaymentOption Title="MasterCard" Active={active == 1} Logo={require('../../../../assets/img/logo_master.png')} OnActive={() => SelectPayment(1)}/>
      <PaymentOption Title="PayPal" Active={active == 2} Logo={require('../../../../assets/img/logo_paypal.png')} OnActive={() => SelectPayment(2)}/>

      <Button variant='secondary' onPress={handleNext} style={styles.next_btn}>
        <ButtonText>Next</ButtonText>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    padding: 12,
  },
  next_btn: {
    marginTop: 24
  }
})