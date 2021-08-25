import BottomSheetBase from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { useState } from "react";
import { View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Button, Portal } from "react-native-paper";
import BottomSheet, { BottomSheetProps } from "../BottomSheet";
import SelectPhoto from "./SelectPhoto";
import TakePhoto from "./TakePhoto";

export interface ImageSelecterProps
  extends Omit<BottomSheetProps, "snapPoints" | "children"> {
  onImageSelected: (uri: string) => void;
}

const ImageSelecter = forwardRef<BottomSheetBase, ImageSelecterProps>(
  (props, ref) => {
    const { onImageSelected } = props;
    const [mode, setMode] = useState<null | "camera" | "library">(null);

    return (
      <Portal>
        <BottomSheet
          title="Choose new photo"
          enablePanDownToClose
          onChange={() => setMode(null)}
          {...props}
          snapPoints={["25%"]}
          ref={ref}
        >
          <View style={{ height: 300 }}>
            <Button
              mode="outlined"
              onPress={() => setMode("camera")}
              style={{ marginVertical: 12 }}
            >
              Take Photo
            </Button>
            <Button mode="outlined" onPress={() => setMode("library")}>
              Select Photo From Library
            </Button>
          </View>
          {mode === "library" && (
            <SelectPhoto onImageSelected={onImageSelected} />
          )}
          {mode === "camera" && <TakePhoto onImageSelected={onImageSelected} />}
        </BottomSheet>
      </Portal>
    );
  }
);

export default ImageSelecter;
