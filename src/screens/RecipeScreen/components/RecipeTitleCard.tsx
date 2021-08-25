import BottomSheetBase, { TouchableOpacity } from "@gorhom/bottom-sheet";
import React, { FC, useRef, useState } from "react";
import { Image, StyleProp, Text, View, ViewStyle } from "react-native";
import { Title } from "react-native-paper";
import CameraSvg from "../../../assets/camera.svg";
import ImageSelecter from "../../../components/ImageSelecter";
import useSurfaceColor from "../../../hooks/useSurfaceColor";
import BlankSvg from "../../../assets/blank.svg";
import uploadLocalImage from "../../../utils/uploadLocalImage";

export interface RecipeTitleCardProps {
  recipeName: string;
  onImageChanged: (uri: string) => void;
  imageUrl?: string;
  style?: StyleProp<ViewStyle>;
  scale: number;
}

const RecipeTitleCard: FC<RecipeTitleCardProps> = (props) => {
  const { recipeName, onImageChanged, imageUrl, style, scale } = props;
  const surfaceColor = useSurfaceColor(0.8);
  const [showCaptureOverlay, setShowCaptureOverlay] = useState(false);
  const sheetRef = useRef<BottomSheetBase>(null);

  return (
    <>
      <TouchableOpacity
        style={style}
        activeOpacity={0.8}
        onPressIn={() => setShowCaptureOverlay(true)}
        onPressOut={() => setShowCaptureOverlay(false)}
        onLongPress={() => {
          sheetRef.current?.expand();
          setShowCaptureOverlay(false);
        }}
      >
        <View style={{ transform: [{ scale }] }}>
          {!imageUrl && (
            <BlankSvg width="100%" height={250} preserveAspectRatio="none" />
          )}
          {imageUrl && (
            <Image
              style={{
                width: "100%",
                height: 250,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              source={{ uri: imageUrl }}
            />
          )}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: surfaceColor,
              width: "100%",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Title
              style={{
                fontSize: 35,
                lineHeight: 35,
                color: "white",
                padding: 10,
              }}
            >
              {recipeName}
            </Title>
          </View>
          {showCaptureOverlay && (
            <View
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.3)",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CameraSvg height={120} width={1000} fill="white" />
              <Text style={{ color: "white" }}>Press & Hold to change</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <ImageSelecter
        ref={sheetRef}
        onImageSelected={async (uri) => {
          const uploadResult = await uploadLocalImage(uri);
          const newImageUri = await uploadResult.ref.getDownloadURL();
          onImageChanged(newImageUri);
          sheetRef.current?.close();
        }}
        onClose={() => sheetRef.current?.close()}
      />
    </>
  );
};

export default RecipeTitleCard;
