import React, { FC } from "react";
import { KeyboardAvoidingView, View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ScreenProps extends ViewProps {}

const Screen: FC<ScreenProps> = (props) => {
  const { style, children, ...rest } = props;
  const { colors } = useTheme();
  const { surface } = colors;

  return (
    <KeyboardAvoidingView
      {...rest}
      behavior="position"
      style={[
        style,
        {
          height: "100%",
          // paddingTop: 50,
          backgroundColor: surface,
        },
      ]}
    >
      {/* <SafeAreaView> */}
      <>{children}</>
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
};

export default Screen;
