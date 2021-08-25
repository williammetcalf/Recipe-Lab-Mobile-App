import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useCallback } from "react";
import { useState } from "react";
import { Image } from "react-native";
import { ScrollView, View } from "react-native";
import { Button, Card, Portal, Text, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App/App";
import ImageSelecter from "../../components/ImageSelecter";
import ParallaxHeader from "../../components/ParallaxHeader";
import Screen from "../../components/Screen";
import { Recipe } from "../../types/Recipe";
import BackButton from "./components/BackButton";
import RecipeTitleCard from "./components/RecipeTitleCard";
import useRecipe from "./useRecipe";
import { BlurView } from "expo-blur";

export type RecipeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Recipe"
>;
export interface RecipeScreenNavigationProps {
  uid: string;
}

const RecipeScreen: FC<RecipeScreenProps> = (props) => {
  const { route } = props;
  const { uid } = route.params;
  const [recipe, recipeRef] = useRecipe(uid);
  const updateRecipe = useCallback(
    (recipe: Partial<Recipe>) => {
      recipeRef.update(recipe);
    },
    [recipeRef]
  );

  return (
    <Screen>
      <ParallaxHeader
        maxHeight={300}
        minHeight={100}
        heroImage={{ uri: recipe?.imageUri }}
      >
        <View style={{ paddingTop: 32, paddingBottom: 100 }}>
          <Title style={{ fontSize: 32 }}>{recipe?.name}</Title>
          {new Array(50).fill(0).map((_, idx) => {
            return (
              <Card key={idx} style={{ marginTop: 16 }}>
                <Card.Content>{/* <Text>test</Text> */}</Card.Content>
              </Card>
            );
          })}
        </View>
      </ParallaxHeader>
      <SafeAreaView
        style={{
          position: "absolute",
          width: "100%",
          top: 0,
          zIndex: 20,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingHorizontal: 12,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            overflow: "hidden",
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#333",
          }}
        >
          <BlurView
            intensity={80}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#333" }}>edit</Text>
          </BlurView>
        </TouchableOpacity>
      </SafeAreaView>
    </Screen>
  );
};

export default RecipeScreen;
