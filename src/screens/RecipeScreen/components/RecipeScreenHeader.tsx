import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

export interface RecipeScreenHeaderProps {}

const RecipeScreenHeader: FC<RecipeScreenHeaderProps> = (props) => {
  const {} = props;

  return (
    <SafeAreaView
      style={{
        position: "absolute",
        width: "100%",
        top: 0,
        zIndex: 20,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingHorizontal: 12,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          overflow: "hidden",
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#333",
        }}
      >
        <BlurView
          intensity={80}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#333" }}>edit</Text>
        </BlurView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RecipeScreenHeader;
