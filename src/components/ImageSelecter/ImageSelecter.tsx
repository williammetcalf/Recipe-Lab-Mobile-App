import BottomSheetBase from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
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
      <BottomSheet
        title="Choose new photo"
        enablePanDownToClose
        onChange={() => setMode(null)}
        {...props}
        snapPoints={["60%"]}
        ref={ref}
      >
        <View style={{ height: 300 }}>
          <Button onPress={() => setMode("camera")}>Take Photo</Button>
          <Button onPress={() => setMode("library")}>
            Select Photo From Library
          </Button>
        </View>
        {mode === "library" && (
          <SelectPhoto onImageSelected={onImageSelected} />
        )}
        {mode === "camera" && <TakePhoto onImageSelected={onImageSelected} />}
      </BottomSheet>
    );
  }
);

export default ImageSelecter;
