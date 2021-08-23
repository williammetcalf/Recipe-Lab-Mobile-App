import React, { FC } from "react";
import { KeyboardAvoidingView, View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";

export interface ScreenProps extends ViewProps {}

const Screen: FC<ScreenProps> = (props) => {
  const { style } = props;
  const { colors } = useTheme();
  const { surface } = colors;

  return (
    <KeyboardAvoidingView
      {...props}
      behavior="position"
      style={[
        style,
        {
          height: "100%",
          backgroundColor: surface,
        },
      ]}
    />
  );
};

export default Screen;
