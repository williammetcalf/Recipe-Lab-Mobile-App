import BottomSheet from "@gorhom/bottom-sheet";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Headline, useTheme } from "react-native-paper";
import Logo from "../../assets/logo.svg";
import AuthButtons from "./components/AuthButtons";
import SignInSheet from "./components/SignInSheet";

export interface WelcomeScreenProps {}

const WelcomeScreen: FC<WelcomeScreenProps> = () => {
  const { colors } = useTheme();
  const { surface } = colors;
  const sheetRef = useRef<BottomSheet>(null);

  const openSignInSheet = useCallback(() => {
    sheetRef.current?.expand();
  }, [sheetRef.current]);
  useEffect(() => {
    sheetRef.current?.close();
  }, [sheetRef.current]);

  return (
    <>
      <SafeAreaView style={{ ...styles.container, backgroundColor: surface }}>
        <Logo height="40%" width="80%" style={styles.logo} />
        <Headline style={{ marginBottom: 200 }}>Recipe Lab</Headline>
        <AuthButtons onSignIn={openSignInSheet} />
        <View style={{ height: "5%" }} />
        <SignInSheet ref={sheetRef} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  logo: {},
});

export default WelcomeScreen;
