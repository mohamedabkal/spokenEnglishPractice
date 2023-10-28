import { Alert, AlertIcon, AlertText, InfoIcon } from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

const Warning = ({warning}) => {
  const [alertAnim] = useState(new Animated.Value(0.4));
  useEffect(() => {
    Animated.loop(
    Animated.sequence([
      Animated.timing(
        alertAnim,
        {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }
      ),
      Animated.timing(
        alertAnim,
        {
          toValue: 0.4,
          duration: 600,
          useNativeDriver: true,
        }
      )
    ])).start()
  }, []);

  return (
    <Animated.View style={{...styles.alertContainer, opacity: alertAnim}}>
      <Alert mx="$2.5" action="warning" variant="solid" >
        <AlertIcon as={InfoIcon} mr="$3" />
        <AlertText style={{color: 'red'}}>
          {warning}
        </AlertText>
      </Alert>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    width: '100%',
    top: 20,
    gap: 24,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
export default Warning;