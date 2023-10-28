import { useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { hasLightSensor, startLightSensor, stopLightSensor } from 'react-native-ambient-light-sensor';

export const useLux = (): number => {
  const [lux, setLux] = useState<number>(0)

  useEffect(() => {
    hasLightSensor();
    startLightSensor();
    const subscription = DeviceEventEmitter.addListener("LightSensor", (data) => {
      setLux(data.lightValue);
    },);
    
    return () => {
      stopLightSensor();
      subscription?.remove();
  };
  }, [])
  
  return lux
}