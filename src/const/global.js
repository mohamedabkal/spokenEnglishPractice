import RNFS from "react-native-fs";
import * as FileSystem from "expo-file-system";

const TARGET_URL = FileSystem.documentDirectory + "/SpokenEnglishPractice";

export default {
  ALERT: {
    error: {
      background: "#FADCD9EE",
      foreground: "#A1160A",
      color: "#A1160A",
      icon: "error",
    },
    info: {
      background: "#C7EBD1EE",
      foreground: "#075E45",
      color: "#075E45",
      icon: "info",
    },
  },

  MEDIA: {
    TARGET_DIR: TARGET_URL,
    // 'selfie_photo', 'face_video', 'body_video'
    SELFIE_PHOTO: {
      orientation: "portrait",
      type: "photo",
      feature: "selfie_photo",
      url: TARGET_URL + "/RESUME_PHOTO.png",
      title: "Selfie Photo",
    },
    SELFIE_LANDSCAPE_PHOTO: {
      orientation: "landscape",
      type: "photo",
      feature: "selfie_photo",
      url: TARGET_URL + "/RESUME_PHOTO.png",
      title: "Selfie Photo",
    },
    SELFIE_BIO_VIDEO: {
      orientation: "landscape",
      type: "video",
      feature: "face_video",
      url: TARGET_URL + "/RESUME_BIO_VIDEO.mp4",
      title: "Bio Video",
    },
    SELFIE_BODY_VIDEO: {
      orientation: "landscape",
      type: "video",
      feature: "body_video",
      url: TARGET_URL + "/RESUME_BODY_VIDEO.mp4",
      title: "Introduction Video",
    },
  },
  SIGN_MESSAGE: "OK",
  PRIVATE_KEY: "private_key",
  PUBLIC_KEY: "public_key",
  USER_PREFERENCE: "user_preference",
};
