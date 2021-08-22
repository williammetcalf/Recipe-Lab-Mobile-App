import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import firebase from "firebase";
import React, { useEffect } from "react";
import {
  // DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import useAuthState from "../hooks/useAuthState";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import NavBar from "./components/NavBar";

const Stack = createNativeStackNavigator();

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
        ...DarkTheme,
        dark: true,
        colors: {
          ...DarkTheme.colors,
          primary: "#67399b",
          accent: "#79629c",
          surface: "#222",
        },
      }}
    >
      {!authState && <WelcomeScreen />}
      {authState && (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ header: (props) => <NavBar {...props} /> }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </PaperProvider>
  );
}
