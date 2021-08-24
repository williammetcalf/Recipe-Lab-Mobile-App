import React, { FC } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Screen from "../../components/Screen";
import AddSheet from "./components/AddSheet";
import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";

export interface HomeScreenProps {}

const HomeScreen: FC<HomeScreenProps> = (props) => {
  return (
    <Screen>
      <Header />
      <ScrollView
        style={{
          padding: 12,
        }}
      >
        <View style={{ height: 130 }} />
        {new Array(5).fill(0).map((_, i) => (
          <RecipeCard key={i}>{i}</RecipeCard>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
      <AddSheet />
    </Screen>
  );
};

export default HomeScreen;
