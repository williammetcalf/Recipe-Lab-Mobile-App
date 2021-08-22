import * as SplashScreen from "expo-splash-screen";
import firebase from "firebase";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import {
  Button,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import useAuthState from "../hooks/useAuthState";
import WelcomeScreen from "../screens/WelcomeScreen";

export default function App() {
  const authState = useAuthState();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const unsub = firebase.auth().onAuthStateChanged(async (s) => {
          await SplashScreen.hideAsync();
          unsub();
        });
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  return (
    <PaperProvider
      theme={{
        ...DefaultTheme,
        dark: true,
        colors: { ...DefaultTheme.colors, primary: "#67399b", text: "#f4f4f4" },
      }}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#333",
          height: "100%",
        }}
      >
        {!authState && <WelcomeScreen />}
        {authState && (
          <Button
            onPress={() => {
              firebase.auth().signOut();
            }}
          >
            Log Out
          </Button>
        )}
      </SafeAreaView>
    </PaperProvider>
  );
}
