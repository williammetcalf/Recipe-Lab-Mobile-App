import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Headline } from "react-native-paper";
import Logo from "../../assets/logo.svg";
import AuthButtons from "./components/AuthButtons";

const WelcomeScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Logo height="40%" width="80%" style={styles.logo} />
      <Headline style={{ marginBottom: 200 }}>Recipe Lab</Headline>
      <AuthButtons />
      <View style={{ height: "5%" }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {},
});

export default WelcomeScreen;
