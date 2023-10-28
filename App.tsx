/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Box, GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, ViewStyle, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import config from "./gluestack-ui.config";

import AuthTest from "./src/pages/test/auth";

//register
import Address from "./src/pages/auth/register/address";
import AuthNavigationBar from "./src/pages/auth/register/auth_navigation_bar";
import Credential from "./src/pages/auth/register/credential";
import Final from "./src/pages/auth/register/final";
import RegisterFingerprint from "./src/pages/auth/register/register_fingerprint";
import SelfiePreview from "./src/pages/auth/register/selfie_preview";
import Start from "./src/pages/auth/register/start";
import Camera from "./src/pages/media/camera";

//sign
import Fingerprint from "./src/pages/auth/sign/fingerprint";
import Login from "./src/pages/auth/sign/login";

//welcome
import Loading from "./src/pages/landing/loading";
import Welcome from "./src/pages/landing/welcome";

//Main
import Account from "./src/pages/main/account/account";
import PaymentDetail from "./src/pages/main/account/payment_detail";
import PaymentSelect from "./src/pages/main/account/payment_select";
import Preview from "./src/pages/main/account/preview";
import Profile from "./src/pages/main/account/profile";
import Resume from "./src/pages/main/account/resume";
import Dashboard from "./src/pages/main/dashboard";
import NavigationBar from "./src/pages/main/navigation_bar";

//component

import Alert from "./src/components/alert";
import LoadIndicator from "./src/components/load_indicator";

//provider
import { Provider } from "react-redux";
import { store } from "./src/store";

const Stack = createNativeStackNavigator();
const RegisterStack = createNativeStackNavigator();
const LandingStack = createNativeStackNavigator();

const Register = () => {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        header: (props) => <AuthNavigationBar {...props} />,
      }}
    >
      <Stack.Screen name="Register" component={Start} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Selfie" component={SelfiePreview} />
      <Stack.Screen
        name="Register Fingerprint"
        component={RegisterFingerprint}
      />
      <Stack.Screen name="Credential" component={Credential} />
      <Stack.Screen name="Congratulations" component={Final} />
    </Stack.Navigator>
  );
};

const Landing = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{
        header: (props) => null,
      }}
    >
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        header: (props) => <NavigationBar {...props} />,
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Resume" component={Resume} />
      <Stack.Screen name="Preview" component={Preview} />
      <Stack.Screen name="Payment Select" component={PaymentSelect} />
      <Stack.Screen name="Payment Detail" component={PaymentDetail} />
    </Stack.Navigator>
  );
};

const Signin = () => {
  return (
    <Stack.Navigator
      initialRouteName="Fingerprint"
      screenOptions={{
        header: (props) => null,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Fingerprint" component={Fingerprint} />
    </Stack.Navigator>
  );
};

function App() {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: "100%",
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <GluestackUIProvider config={config}>
          <Box
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}
            height="100%"
          >
            <PaperProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="Landing"
                  screenOptions={{
                    header: (props) => null,
                  }}
                >
                  <Stack.Screen name="Landing" component={Landing} />
                  <Stack.Screen name="SignUp" component={Register} />
                  <Stack.Screen name="SignIn" component={Signin} />
                  <Stack.Screen name="Main" component={Main} />
                  <Stack.Screen name="Camera" component={Camera} />
                  <Stack.Screen name="AuthTest" component={AuthTest} />
                </Stack.Navigator>
              </NavigationContainer>
            </PaperProvider>
          </Box>
          <Alert />
          <LoadIndicator />
        </GluestackUIProvider>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
