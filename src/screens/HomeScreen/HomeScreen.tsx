import React, { FC, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Searchbar } from "react-native-paper";
import Screen from "../../components/Screen";
import AddSheet from "./components/AddSheet";
import Header from "./components/Header";
import RecipeList from "./components/RecipeList";
import SearchRecipes from "./components/SearchRecipes";

export interface HomeScreenProps {}

const HomeScreen: FC<HomeScreenProps> = (props) => {
  const [search, setSearch] = useState("");

  return (
    <Screen>
      <Header />
      <ScrollView
        style={{
          padding: 12,
        }}
      >
        <View style={{ height: 110 }} />
        <View
          style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
        >
          <SearchRecipes value={search} onChange={setSearch} />
          <Button
            mode="outlined"
            style={{
              borderRadius: 50,
            }}
          >
            edit
          </Button>
        </View>
        <RecipeList filter={search} />
        <View style={{ height: 100 }} />
      </ScrollView>
      <AddSheet />
    </Screen>
  );
};

export default HomeScreen;
