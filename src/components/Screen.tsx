import React, { FC } from "react";
import { ScrollViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

export interface ScreenProps extends ScrollViewProps {}

const Screen: FC<ScreenProps> = (props) => {
  const { style } = props;
  const { colors } = useTheme();
  const { surface } = colors;

  return (
    <ScrollView
      {...props}
      style={[
        style,
        {
          height: "100%",
          backgroundColor: surface,
          padding: 12,
        },
      ]}
    />
  );
};

export default Screen;
