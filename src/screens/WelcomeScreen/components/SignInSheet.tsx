import BottomSheet from "@gorhom/bottom-sheet";
import React from "react";
import { View } from "react-native";
import { Title, Text } from "react-native-paper";
import GoogleAuthButton from "./GoogleAuthButton";

export interface SignInProps {}

const snapPoints = ["90%"];
const SignInSheet = React.forwardRef<BottomSheet, SignInProps>(
  (props, sheetRef) => {
    const {} = props;

    return (
      <BottomSheet
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        ref={sheetRef}
        backgroundStyle={{ backgroundColor: "#333" }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Title>Sign In to Recipe Lab</Title>
          <GoogleAuthButton />
          <Text>or login with email password</Text>
        </View>
      </BottomSheet>
    );
  }
);

export default SignInSheet;
