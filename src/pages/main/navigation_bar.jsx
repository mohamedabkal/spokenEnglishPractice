import * as React from 'react';
import { Appbar } from 'react-native-paper';

export default NavigationBar = ({ navigation, back, route }) => {

  if(route.name == 'Preview') {
    return <></>
  }

  return (
    <Appbar.Header style={styles.appbar}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={route.name} />
    </Appbar.Header>
  );
}

const styles = {
  appbar: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  }
}