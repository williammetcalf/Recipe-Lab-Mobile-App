import React, { FC } from "react";
import { Dimensions, KeyboardAvoidingView, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import Background from "../assets/background.svg";

export interface ScreenProps extends ViewProps {}

const Screen: FC<ScreenProps> = (props) => {
  const { style, children, ...rest } = props;
  const { colors } = useTheme();
  const { width, height } = Dimensions.get("window");

  return (
    <KeyboardAvoidingView
      behavior="padding"
      {...rest}
      style={[style, { height: "100%", backgroundColor: colors.background }]}
    >
      {/* <Background
        width={width}
        height={height}
        preserveAspectRatio="none"
        style={{ position: "absolute", top: 0, left: 0 }}
      /> */}
      {children}
    </KeyboardAvoidingView>
  );
};

export default Screen;
