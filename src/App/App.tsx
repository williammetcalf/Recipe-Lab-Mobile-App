import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import "react-native-gesture-handler";
import { DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { GlobalLoadingContext } from "../components/GlobalLoading";
import useAuthState from "../hooks/useAuthState";
import HomeScreen from "../screens/HomeScreen";
import { HomeScreenProps } from "../screens/HomeScreen/HomeScreen";
import RecipeScreen, {
  RecipeScreenProps,
} from "../screens/RecipeScreen/RecipeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import useWaitForInitialAuthState from "./hooks/useWaitForInitialAuthState";

export type RootStackParamList = {
  Home: HomeScreenProps;
  Recipe: RecipeScreenProps;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [globalLoading, setGlobalLoading] = useState(false);
  const authState = useAuthState();
  useWaitForInitialAuthState();

  return (
    <PaperProvider
      theme={{
        ...DarkTheme,
        dark: true,
        colors: {
          ...DarkTheme.colors,
          surface: "#222",
          background: "#111",
          text: "white",
          primary: "#a971e8",
          accent: "#7332bb",
        },
      }}
    >
      <GlobalLoadingContext.Provider
        value={{ loading: globalLoading, setLoading: setGlobalLoading }}
      >
        <NavigationContainer>
          {!authState && <WelcomeScreen />}
          {authState && (
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Recipe"
                component={RecipeScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </GlobalLoadingContext.Provider>
    </PaperProvider>
  );
}
