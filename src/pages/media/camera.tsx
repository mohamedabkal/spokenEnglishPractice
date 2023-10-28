import { Text, View } from "@gluestack-ui/themed";
import { NavigationProp, NavigatorScreenParams } from "@react-navigation/core";
import { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Image } from "react-native-compressor";
import { useDispatch } from "react-redux";
import Warning from "../../components/media/warning";
import GLOBAL from "../../const/global";
import { useLux } from "../../hooks/useLux";
import { useScreenSize } from "../../hooks/useScreenSize";
import { setLoadingState } from "../../store/global";
import { Camera, CameraType } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as React from "react";
import * as FileSystem from "expo-file-system";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ScreenOrientation from "expo-screen-orientation";

const LUX_MIN = 40;
const LUX_MAX = 100;

const LUX_LOW_MSG = "Your light is lower than acceptable range";
const LUX_HIGH_MSG = "Your light is higher than acceptable range";

const ParamItem = ({ label, value }) => {
  return (
    <Text style={{ color: "red", fontSize: 12, lineHeight: 16 }}>
      {label} : {value}
    </Text>
  );
};

export default function MediaPage({
  navigation,
  route,
}: {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  route: NavigatorScreenParams<{ type: any }>;
}) {
  const cameraRef = useRef<Camera>(null);

  const { width } = useWindowDimensions();
  const lightValue = useLux();
  const dispatch = useDispatch();
  const [srcWidth, srcHeight] = useScreenSize();

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [faceValues, setFaceValues] = useState({ yaw: 0, roll: 0, pitch: 0 });
  const [loading, setLoading] = useState(true);

  const mediaType = route.params?.type ?? GLOBAL.MEDIA.SELFIE_PHOTO;
  const isLandscape = mediaType?.orientation === "landscape";

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    ScreenOrientation.lockAsync(
      isLandscape
        ? ScreenOrientation.OrientationLock.LANDSCAPE
        : ScreenOrientation.OrientationLock.PORTRAIT
    ).finally(() => {
      setLoading(false);
    });
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, [mediaType]);

  const handleFacesDetected = React.useCallback(
    ({ faces }: { faces: FaceDetector.FaceFeature[] }) => {
      const face: FaceDetector.FaceFeature = faces[0];
      if (face?.yawAngle && face?.rollAngle && face?.pitchAngle) {
        setFaceValues({
          yaw: face?.yawAngle,
          roll: face?.rollAngle,
          pitch: face?.pitchAngle,
        });
      }
    },
    []
  );

  const height = isLandscape
    ? Math.round((width * 9) / 16)
    : Math.round((width * 16) / 9);

  const renderWarning = () => {
    if (lightValue == 0 || (lightValue >= LUX_MIN && lightValue <= LUX_MAX))
      return null;
    return (
      <Warning warning={lightValue < LUX_MIN ? LUX_LOW_MSG : LUX_HIGH_MSG} />
    );
  };

  const handleNext = async () => {
    isLandscape &&
      (await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      ));
    if (mediaType == GLOBAL.MEDIA.SELFIE_PHOTO) {
      //register
      navigation.navigate("Selfie");
    } else {
      navigation.goBack();
    }
  };

  const createDirectory = async () => {
    try {
      const directoryInfo = await FileSystem.getInfoAsync(
        GLOBAL.MEDIA.TARGET_DIR
      );
      if (!directoryInfo.exists) {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "/SpokenEnglishPractice"
        );
      }
    } catch (error) {
      console.error("Error creating directory:", error);
    }
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      // console.log("HANDLE CAPTURE", mediaType);
      try {
        await createDirectory();
        // if (mediaType.type === "photo") {
        dispatch(
          setLoadingState({ flag: true, message: "Photo Processing..." })
        );
        const photo = await cameraRef.current?.takePictureAsync();
        // Requests permissions
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
            photo.uri
          );
        if (!permissions.granted) {
          throw new Error("Permission denied for storage access framework");
        }
        const compressedImage = await Image.compress(photo.uri);
        await FileSystem.moveAsync({
          from: compressedImage,
          to: GLOBAL.MEDIA.SELFIE_PHOTO.url,
        });
        dispatch(setLoadingState({ flag: false, message: "" }));
        handleNext();
        // } else if (mediaType.type === "video") {
        //   isRecording ? stopRecording() : startRecording();
        //   setIsRecording(!isRecording);
        // }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setLoadingState({ flag: false, message: "" }));
      }
    }
  };

  const isValidLight = (value) => {
    return value >= LUX_MIN && value <= LUX_MAX;
  };

  const controls = () => {
    return (
      <View
        style={{
          ...styles.bottomContainer,
          bottom: !isLandscape ? 0 : undefined,
          width: isLandscape ? 120 : srcWidth,
          height: isLandscape ? srcHeight : 120,
          alignItems: isLandscape ? "flex-start" : "center",
          justifyContent: isLandscape ? "center" : "flex-start",
        }}
      >
        <View style={styles.capture}>
          <TouchableOpacity
            onPress={handleCapture}
            disabled={!isValidLight(lightValue)}
          >
            <Ionicons name="camera" color="#000" size={50} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderFeature = () => {
    return (
      <View style={styles.paramContainer}>
        <ParamItem label="LUX" value={lightValue} />
        <ParamItem label="Yaw" value={faceValues.yaw} />
        <ParamItem label="Roll" value={faceValues.roll} />
        <ParamItem label="Pitch" value={faceValues.pitch} />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
      }}
    >
      {!loading && (
        <>
          <Camera
            ref={cameraRef}
            style={{
              height: height,
              width: "100%",
            }}
            type={CameraType.front}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 100,
              tracking: true,
            }}
            ratio="16:9"
            orien
          />
          {renderFeature()}
          {controls()}
          {renderWarning()}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  recContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  capture: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  paramContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
  },
  container: {
    display: "flex",
    height: "100%",
    backgroundColor: "black",
  },
  bottomContainer: {
    position: "absolute",
    right: 0,
  },
  left_action: {
    width: 40,
    height: 40,
    borderRadius: 99,
    backgroundColor: "#36c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  action: {
    width: 60,
    height: 60,
    borderRadius: 99,
    backgroundColor: "#c33",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },

  right_action: {
    width: 35,
    height: 35,
    borderRadius: 99,
    backgroundColor: "#36c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },

  loading: {
    position: "absolute",
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444444cc",
  },

  outer_action: {
    width: 60,
    height: 60,
    borderRadius: 99,
    backgroundColor: "white",
    borderColor: "#c33",
    borderWidth: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  inner_action: {
    width: 45,
    height: 45,
    borderRadius: 99,
    backgroundColor: "#c33",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
