import React, { FC } from "react";
import { KeyboardAvoidingView, View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";

export interface ScreenProps extends ViewProps {}

const Screen: FC<ScreenProps> = (props) => {
  const { style, children, ...rest } = props;
  const { colors } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      {...rest}
      style={[style, { backgroundColor: colors.background }]}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default Screen;
