import React, { FC } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Portal } from "react-native-paper";
import Background from "../../assets/login-background.svg";
import AnonAuthButton from "./components/AnonAuthButton";
import EmailPasswordForm from "./components/EmailPasswordForm";
import Header from "./components/Header";

export interface WelcomeScreenProps {}

const WelcomeScreen: FC<WelcomeScreenProps> = () => {
  return (
    <>
      <Portal.Host>
        <KeyboardAvoidingView behavior="position">
          <SafeAreaView style={{ ...styles.container }}>
            <Background
              height="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
            />
            <Header />

            <View style={{ flex: 1 }} />
            <EmailPasswordForm containerStyle={styles.emailPasswordForm} />
            <AnonAuthButton />

            <View style={{ height: "5%" }} />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Portal.Host>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "90%",
  },
  emailPasswordForm: {
    marginBottom: 150,
  },
});

export default WelcomeScreen;
