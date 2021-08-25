import React, { FC } from "react";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import { Platform } from "react-native";

export interface SelectPhotoProps {
  onImageSelected: (uri: string) => void;
}

const SelectPhoto: FC<SelectPhotoProps> = (props) => {
  const { onImageSelected } = props;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        } else {
          const imageResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
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

export default SelectPhoto;
