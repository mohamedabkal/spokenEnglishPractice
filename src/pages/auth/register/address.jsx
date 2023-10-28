import {
  Box,
  Button,
  ButtonText,
  CircleIcon,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  VStack,
} from "@gluestack-ui/themed";
// import Geolocation from "@react-native-community/geolocation";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import InfomDlg from "../../../components/dialog/inform_dlg";
import GLOBAL from "../../../const/global";
import html_script from "./html_script";

import { useDispatch, useSelector } from "react-redux";
import useGeoPrmission from "../../../hooks/useGeoPermission";
import { updateProfile } from "../../../store/profile";

export default AddressPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile);

  const [current, setCurrent] = useState({ lat: 0, lng: 0 });
  const [currentAddress, setCurrentAddress] = useState("...");
  const [addressOption, setAddressOption] = useState("home");
  const [mapInitialized, setMapInitialized] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  // const geoPermission = useGeoPrmission();
  // const [status, requestPermission] = Location.useForegroundPermissions();

  const webRef = useRef(null);

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      let { coords } = await Location.getLastKnownPositionAsync({});
      if (coords) {
        const { latitude, longitude } = coords;
        setCurrent({ lat: latitude, lng: longitude });
        updateAddress([latitude, longitude]);
      }
    }
  };

  useEffect(() => {
    getLocationPermission();
    // Geolocation.getCurrentPosition(
    //   position => {
    //     const {latitude, longitude} = position.coords;
    //     setCurrent({lat: latitude, lng: longitude});
    //     updateAddress([latitude, longitude]);
    //   },
    //   error => {
    //     console.log('Error getting location:', error);
    //   },
    // );
  }, []);

  useEffect(() => {
    if (webRef.current && mapInitialized) {
      console.log("current", current);
      webRef.current.injectJavaScript(
        `set_current_location([${current.lat}, ${current.lng}])`
      );
    }
  }, [current, webRef, mapInitialized]);

  const handleNext = () => {
    setConfirmVisible(true);
  };
  const handleConfirm = () => {
    setConfirmVisible(false);
    dispatch(
      updateProfile(
        addressOption == "home"
          ? { home_address: currentAddress }
          : { office_address: currentAddress }
      )
    );
    navigation.navigate("Camera", { type: GLOBAL.MEDIA.SELFIE_PHOTO });
  };
  const updateAddress = (pos) => {
    const { latitude, longitude } = pos;
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${pos[0]}&lon=${pos[1]}&format=json`,
      {
        headers: {
          "User-Agent": "ID of your APP/service/website/etc. v0.1",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setCurrentAddress(res.display_name);
      });
  };

  const handleWebViewMessage = (event) => {
    console.log("Handle WebViewMessage");
    console.log(event.nativeEvent.data);
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data.message);

    if (data.message == "Initialized") {
      setMapInitialized(true);
    } else if (data.message == "OnCircle") {
      console.log(current, data.location);
      updateAddress(data.location);
    }
  };

  return (
    <Box style={styles.container}>
      <WebView
        style={styles.map}
        ref={webRef}
        source={{ html: html_script }}
        onMessage={handleWebViewMessage}
      />
      <View style={styles.next}>
        <Button
          variant="primary"
          onPress={handleNext}
          disabled={currentAddress == "..."}
        >
          <ButtonText>Next</ButtonText>
        </Button>
      </View>
      <View style={styles.mark}>
        <Text style={styles.address}>
          {current.lat}, {current.lng}
        </Text>
        <Text style={styles.text}>{currentAddress}</Text>
      </View>

      <InfomDlg
        Title="Address"
        Visible={confirmVisible}
        OnSubmit={() => {
          handleConfirm();
        }}
      >
        <Text style={styles.address}>
          {current.lat}, {current.lng}
        </Text>
        <Text style={styles.text}>{currentAddress}</Text>

        <RadioGroup
          style={styles.type}
          value={addressOption}
          onChange={setAddressOption}
        >
          <VStack space="lg">
            <Radio value="home">
              <RadioIndicator mr="$2" mt="$0.5">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Home Address</RadioLabel>
            </Radio>
            <Radio value="office">
              <RadioIndicator mr="$2" mt="$0.5">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Office Address</RadioLabel>
            </Radio>
          </VStack>
        </RadioGroup>
      </InfomDlg>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  next: {
    position: "absolute",
    width: "100%",
    padding: 10,
    bottom: 0,
  },
  mark: {
    position: "absolute",
    bottom: 100,
    backgroundColor: "#ffffffd0",
    borderRadius: 10,
    padding: 10,
    margin: 30,
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  address: {
    color: "#c33",
  },
  type: {
    marginTop: 20,
  },
});
