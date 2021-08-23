import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ScreenHeaderProps {}

const ScreenHeader: FC<ScreenHeaderProps> = (props) => {
  const {} = props;
  const { canGoBack, goBack } = useNavigation();

  return (
    <SafeAreaView
      style={{
        padding: 0,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {canGoBack() ? (
        <IconButton icon="keyboard-backspace" size={30} onPress={goBack} />
      ) : (
        <View />
      )}
      <IconButton icon="account" size={30} />
    </SafeAreaView>
  );
};

export default ScreenHeader;
