import { Box, ScrollView } from "@gluestack-ui/themed";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";
import { useSelector } from "react-redux";
import global from "../../../const/global";

const Selfie = ({ name, selfie }) => {
  return (
    <Box style={selfieStyles.box}>
      <Avatar.Image
        style={selfieStyles.avatar}
        size={100}
        source={{ uri: `file://${selfie}` }}
      />
      <Text style={selfieStyles.title}>{name}</Text>
    </Box>
  );
};

const selfieStyles = StyleSheet.create({
  box: {
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
  },
});

let screenWidth = Dimensions.get("window").width;

const ListItem = ({ text, onPress }) => {
  return (
    <Box style={listItemStyles.box}>
      <TouchableRipple onPress={onPress}>
        <Text style={listItemStyles.text}>{text}</Text>
      </TouchableRipple>
    </Box>
  );
};

const listItemStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    height: 48,
    lineHeight: 48,
    paddingLeft: 10,
  },
  box: {
    width: screenWidth - 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default ({ navigation }) => {
  const store = useSelector((state) => state.profile);
  console.log(store);

  const handleResume = () => {
    navigation.navigate("Resume");
  };

  const handlePayment = () => {
    navigation.navigate("Payment Select");
  };

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.area}>
        <View style={styles.view}>
          <Selfie
            name={`${store.first_name} ${store.last_name}`}
            selfie={global.MEDIA.SELFIE_PHOTO.url}
          />
          <ListItem
            text="Profile"
            onPress={() => {
              handleProfile();
            }}
          />
          <ListItem
            text="Resumes"
            onPress={() => {
              handleResume();
            }}
          />
          <ListItem
            text="Payment"
            onPress={() => {
              handlePayment();
            }}
          />
        </View>
      </ScrollView>
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
});
