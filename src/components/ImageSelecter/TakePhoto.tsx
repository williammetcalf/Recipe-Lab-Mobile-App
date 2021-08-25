import React, { FC } from "react";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import { Platform } from "react-native";

export interface TakePhotoProps {
  onImageSelected: (uri: string) => void;
}

const TakePhoto: FC<TakePhotoProps> = (props) => {
  const { onImageSelected } = props;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        } else {
          const imageResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [3, 4],
          });
          if (!imageResult.cancelled) {
            onImageSelected(imageResult.uri);
          }
        }
      }
    })();
  }, []);

  return null;
};

export default TakePhoto;
