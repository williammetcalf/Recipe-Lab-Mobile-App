import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import "react-native-gesture-handler";
import { DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { GlobalLoadingContext } from "../components/GlobalLoading";
import useAuthState from "../hooks/useAuthState";
import HomeScreen from "../screens/HomeScreen";
import { HomeScreenProps } from "../screens/HomeScreen/HomeScreen";
import RecipeScreen, {
  RecipeScreenNavigationProps,
} from "../screens/RecipeScreen/RecipeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import useWaitForInitialAuthState from "./hooks/useWaitForInitialAuthState";

export type RootStackParamList = {
  Home: HomeScreenProps;
  Recipe: RecipeScreenNavigationProps;
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
          surface: "#71ceff",
          background: "#282f3f",
          text: "white",
          primary: "#027dec",
          accent: "#027dec",
        },
        roundness: 20,
      }}
    >
      <GlobalLoadingContext.Provider
        value={{ loading: globalLoading, setLoading: setGlobalLoading }}
      >
        <NavigationContainer>
          {!authState && <WelcomeScreen />}
          {authState && (
            <CurrentUserContext.Provider value={authState}>
              <Stack.Navigator initialRouteName="Home" screenOptions={{}}>
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
            </CurrentUserContext.Provider>
          )}
        </NavigationContainer>
      </GlobalLoadingContext.Provider>
    </PaperProvider>
  );
}
