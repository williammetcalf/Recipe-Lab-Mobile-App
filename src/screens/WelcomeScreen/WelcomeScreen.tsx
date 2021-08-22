import React, { FC } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Headline, useTheme } from "react-native-paper";
import Logo from "../../assets/logo.svg";
import AuthButtons from "./components/AuthButtons";

const WelcomeScreen: FC = () => {
  const { colors } = useTheme();
  const { surface } = colors;

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: surface }}>
      <Logo height="40%" width="80%" style={styles.logo} />
      <Headline style={{ marginBottom: 200 }}>Recipe Lab</Headline>
      <AuthButtons />
      <View style={{ height: "5%" }}></View>
    </SafeAreaView>
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
