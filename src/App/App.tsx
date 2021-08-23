import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import firebase from "firebase";
import React, { useEffect } from "react";
import { useState } from "react";
import "react-native-gesture-handler";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { GlobalLoadingContext } from "../components/GlobalLoading";
import useAuthState from "../hooks/useAuthState";
import HomeScreen from "../screens/HomeScreen";
import { HomeScreenProps } from "../screens/HomeScreen/HomeScreen";
import RecipeScreen, {
  RecipeScreenProps,
} from "../screens/RecipeScreen/RecipeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import NavBar from "./components/NavBar";

export type RootStackParamList = {
  Home: HomeScreenProps;
  Recipe: RecipeScreenProps;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [globalLoading, setGlobalLoading] = useState(false);
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
        colors: {
          ...DefaultTheme.colors,
          text: "white",
          primary: "#a971e8",
          accent: "#7332bb",
        },
      }}
    >
      <GlobalLoadingContext.Provider
        value={{ loading: globalLoading, setLoading: setGlobalLoading }}
      >
        {!authState && <WelcomeScreen />}
        {authState && (
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ header: (props) => <NavBar {...props} /> }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Recipe" component={RecipeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </GlobalLoadingContext.Provider>
    </PaperProvider>
  );
}
