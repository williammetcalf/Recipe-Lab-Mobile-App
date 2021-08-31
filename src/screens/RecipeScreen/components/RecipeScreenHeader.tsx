import { TouchableHighlight } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

export interface RecipeScreenHeaderProps {
  isEditMode: boolean;
  onEditModeChange: (isEditMode: boolean) => void;
}

const RecipeScreenHeader: FC<RecipeScreenHeaderProps> = (props) => {
  const { isEditMode, onEditModeChange } = props;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
        underlayColor="rgba(0,0,0,0.8)"
        onPress={() => onEditModeChange(!isEditMode)}
        style={{
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        <BlurView intensity={100}>
          <IconButton
            icon={isEditMode ? "close" : "reorder-horizontal"}
            color="white"
          />
        </BlurView>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    top: 0,
    right: 10,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default RecipeScreenHeader;
