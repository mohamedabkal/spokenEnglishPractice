import { Box, Button, ButtonText, ScrollView } from "@gluestack-ui/themed";
import { useLinkTo } from "@react-navigation/native";
import { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import ApiClient from "../../../api_client";
import InfomDlg from "../../../components/dialog/inform_dlg";
import GLOBAL from "../../../const/global";
import Shared from "../../../const/shared";
import { pushAlert } from "../../../store/alert";
import { setLoadingState } from "../../../store/global";

const Selfie = () => {
  return (
    <Avatar.Image
      style={{ marginBottom: 20 }}
      size={100}
      source={{ uri: `file://${GLOBAL.MEDIA.SELFIE_PHOTO.url}` }}
    />
  );
};

let screenWidth = Dimensions.get("window").width;

const ProfileItem = ({ label, value }) => {
  return (
    <Box style={profileStyles.box}>
      <Text style={profileStyles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => {
          console.log("A");
        }}
      >
        <Text style={profileStyles.value}>{value}</Text>
      </TouchableOpacity>
    </Box>
  );
};

const profileStyles = StyleSheet.create({
  label: {
    color: "#5CB35E",
    fontSize: 14,
  },
  value: {
    fontSize: 20,
    height: 42,
    lineHeight: 42,
  },
  box: {
    width: screenWidth - 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 18,
  },
});

export default ({ navigation }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const linkTo = useLinkTo();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile);
  console.log("STORE", store);

  const handleNext = async () => {
    const device_id = await Shared.DeviceInfo.getUniqueId();
    const data = {
      email: store.email,
      password: store.password,
      first_name: store.first_name,
      last_name: store.last_name,
      university_name: store.university_institution_name,
      undergraduate_admission_year: store.undergraduate_admission_year,
      grduation_year: store.graduation_year,
      department: store.department,
      height: store.height,
      weight: store.weight,
      selfie_photo: `file://${GLOBAL.MEDIA.SELFIE_PHOTO.url}`,
      home_address: store.home_address,
      office_address: store.office_address,
      device_id: device_id,
      public_key: store.public_key,
      private_key: store.private_key,
    };
    Shared.SharedPreferences.setItem(
      GLOBAL.USER_PREFERENCE,
      JSON.stringify(data)
    );
    data.private_key = undefined;
    dispatch(setLoadingState({ flag: true, message: "Registering..." }));
    ApiClient.register(data)
      .then(({ error, data }) => {
        console.log("register", error, data);
        dispatch(setLoadingState({ flag: false, message: "" }));
        if (error) {
          const message = typeof error != "string" ? error.join("\n") : error;
          dispatch(
            pushAlert({
              type: "error",
              title: "Register Failed!",
              message: message,
              time: 5,
            })
          );
          return;
        }
        setConfirmVisible(true);
      })
      .catch((error) => {
        if (error) {
          return console.log("Register Exception: ", error);
        }
      })
      .finally(() => {
        dispatch(setLoadingState({ flag: false, message: "" }));
      });
  };

  const handleConfirm = () => {
    linkTo("/Landing/Welcome");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.area}>
        <View style={styles.view}>
          <Selfie />
          <ProfileItem label="First Name" value={store.first_name} />
          <ProfileItem label="Last Name" value={store.last_name} />
          <ProfileItem label="Email" value={store.email} />
          <ProfileItem label="Mobile Number" value={store.mobile_number} />
          <ProfileItem
            label="University/Institution Name"
            value={store.university_institution_name}
          />
          <ProfileItem
            label="Undergraduate Admission"
            value={store.undergraduate_admission_year}
          />
          <ProfileItem label="Graduation Year" value={store.graduation_year} />
          <ProfileItem label="Department" value={store.department} />
          <ProfileItem label="Height" value={store.height} />
          <ProfileItem label="Weight" value={store.weight} />

          <Button
            style={styles.button}
            variant="secondary"
            onPress={handleNext}
          >
            <ButtonText>Register</ButtonText>
          </Button>
        </View>
      </ScrollView>

      <InfomDlg
        Title="Register"
        Visible={confirmVisible}
        OnSubmit={() => {
          handleConfirm();
        }}
      >
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.info}>
          {store.first_name} {store.last_name} is successfully registered!
        </Text>
      </InfomDlg>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    backgroundColor: "white",
  },
  view: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
  },
  inner: {
    padding: 24,
    backgroundColor: "white",
  },
  text: {
    fontSize: 42,
  },
  button: {
    width: "100%",
  },
  title: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 32,
  },
  info: {
    color: "black",
  },
});
