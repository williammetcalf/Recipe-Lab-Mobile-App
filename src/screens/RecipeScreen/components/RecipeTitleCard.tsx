import BottomSheetBase, { TouchableOpacity } from "@gorhom/bottom-sheet";
import React, { FC, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { Title } from "react-native-paper";
import CameraSvg from "../../../assets/camera.svg";
import ImageSelecter from "../../../components/ImageSelecter";
import useSurfaceColor from "../../../hooks/useSurfaceColor";

export interface RecipeTitleCardProps {
  recipeName: string;
}

const RecipeTitleCard: FC<RecipeTitleCardProps> = (props) => {
  const { recipeName } = props;
  const surfaceColor = useSurfaceColor(0.8);
  const [showCaptureOverlay, setShowCaptureOverlay] = useState(false);
  const sheetRef = useRef<BottomSheetBase>(null);
  const [image, setImage] = useState(
    "https://honest-food.net/wp-content/uploads/2020/02/okra-gumbo-recipe.jpg"
  );

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={() => setShowCaptureOverlay(true)}
        onPressOut={() => setShowCaptureOverlay(false)}
        onLongPress={() => {
          sheetRef.current?.expand();
          setShowCaptureOverlay(false);
        }}
      >
        <View>
          <Image
            style={{ width: "100%", height: 200 }}
            source={{
              uri: image,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: surfaceColor,
              width: "100%",
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
        onImageSelected={setImage}
        onClose={() => sheetRef.current?.snapToIndex(-1)}
      />
    </>
  );
};

export default RecipeTitleCard;
