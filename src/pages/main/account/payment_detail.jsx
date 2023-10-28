import { Button, ButtonText, Input, InputField, View } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import InfomDlg from '../../../components/dialog/inform_dlg';

const PaymentDetail = ({navigation, route}) => {
  console.log(route)
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [detailType] = useState(route.params.detailType ?? "paypal")
  const [informVisible, setInformVisible] = useState(false);

  const handlePayment = () => {
    // Here, you can implement payment processing logic
    // Ensure that you handle payment securely on the server-side

    // For demonstration, we'll just log the entered data
    console.log('Card Number:', cardNumber);
    console.log('Card Holder:', cardHolder);
    console.log('Expiration Date:', expirationDate);
    console.log('CVV:', cvv);

    // Clear the form or navigate to the next screen
    setCardNumber('');
    setCardHolder('');
    setExpirationDate('');
    setCVV('');
  };

  const handleSubmit = () => {
    setInformVisible(true)
  }

  const handleCardNumber = (text) => {
    const cardNumberPattern = /^(?:(3[47][0-9]{13})|(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9][0-9])[0-9]{12}))(?:[0-9]{3})?$/;
    const isValid = cardNumberPattern.test(text);
    if(isValid)
      setCardNumber(text)
  }

  const validateCardNumber = (text) => {
    console.log(text)
  }

  const cardDetailRender = () => {
    return (
      <>
        <Input variant="primary" style={styles.input}>
          <InputField 
            placeholder="Card Number"
            value={cardNumber}
            keyboardType="numeric"
            onTextInput={(txt) => validateCardNumber(txt)}
            onChangeText={(text) => handleCardNumber(text)}/>
        </Input>

        <Input variant="primary" style={styles.input}>
          <InputField 
            placeholder="Card Holder"
            value={cardHolder}
            onChangeText={(text) => setCardHolder(text)}/>
        </Input>

        <Input variant="primary" style={styles.input}>
          <InputField 
            placeholder="Expiration Date (MM/YY)"
            value={expirationDate}
            onChangeText={(text) => setExpirationDate(text)}/>
        </Input>

        <Input variant="primary" style={styles.input}>
          <InputField 
            placeholder="CVV"
            value={cvv}
            onChangeText={(text) => setCVV(text)}/>
        </Input>
      </>
    )
  };

  const cardPaypalRender = () => {
    return (
      <Input variant="primary" style={styles.input}>
        <InputField 
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}/>
      </Input>
    )
  };

  return (
    <View style={styles.container}>
      <InfomDlg Title="Terms Of Service" Visible={informVisible} OnSubmit={(flag) => setInformVisible(false)}>
          Congratulations! {"\n\n"}
          Sign-up bonus will be determined after review
      </InfomDlg>
      
      {detailType == "card" ? cardDetailRender() : cardPaypalRender()} 
      <Button variant='secondary' onPress={handleSubmit} style={styles.next_btn}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default PaymentDetail;
