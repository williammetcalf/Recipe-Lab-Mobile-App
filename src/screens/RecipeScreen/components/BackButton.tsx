import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import useSurfaceColor from "../../../hooks/useSurfaceColor";

export interface BackButtonProps {}

const BackButton: FC<BackButtonProps> = (props) => {
  const {} = props;
  const { canGoBack, goBack } = useNavigation();
  const backgroundColor = useSurfaceColor(0.5);

  if (!canGoBack()) return null;

  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        top: 40,
        left: 10,
      }}
    >
      <Button
        mode="contained"
        icon="arrow-left"
        onPress={goBack}
        color="black"
        style={{ backgroundColor }}
      >
        Back
      </Button>
    </View>
  );
};

export default BackButton;
