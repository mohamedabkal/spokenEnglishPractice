import { useDeviceOrientation } from '@react-native-community/hooks';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export const useScreenSize = () => {
  const [srcWidth, setSrcWidth] = useState(Dimensions.get('window').width);
  const [srcHeight, setSrcHeight] = useState(Dimensions.get('window').height);

  const orientation = useDeviceOrientation()

  useEffect(() => {
    setSrcHeight(Dimensions.get('window').height);
    setSrcWidth(Dimensions.get('window').width);
  }, [orientation])
  
  return [srcWidth, srcHeight];
}