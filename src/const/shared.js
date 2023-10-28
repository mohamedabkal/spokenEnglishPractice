const SharedPreferences = require('react-native-shared-preferences');
SharedPreferences.setName("SpokenEnglishPractice");

import DeviceInfo from 'react-native-device-info';

export default {
  SharedPreferences,
  DeviceInfo
}
