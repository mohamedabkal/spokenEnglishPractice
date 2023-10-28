import { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';

export default (): boolean => {
  const [isGranted, setIsGranted] = useState(false)

  useEffect(() => {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: 'Ridesharer Geolocation Permission',
          message: 'Ridesharer needs access to your current location so you can share or search for a ride'
        }).then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the geolocation")
            setIsGranted(true);
          } else {
            console.log("Geolocation permission denied")
            setIsGranted(false);
        }
      })
    } catch (err) {
      console.warn(err)
    }
  }, [isGranted])

  return isGranted
}