import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useCallback } from "react";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Card, Portal, Text } from "react-native-paper";
import { RootStackParamList } from "../../App/App";
import Screen from "../../components/Screen";
import { Recipe } from "../../types/Recipe";
import BackButton from "./components/BackButton";
import RecipeTitleCard from "./components/RecipeTitleCard";
import useRecipe from "./useRecipe";

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
  const [imageScale, setImageScale] = useState(1);

  return (
    <Screen>
      <Portal.Host>
        <RecipeTitleCard
          style={{ position: "absolute", width: "100%" }}
          recipeName={recipe?.name || ""}
          imageUrl={recipe?.imageUri}
          onImageChanged={(uri) => {
            updateRecipe({ imageUri: uri });
          }}
          scale={imageScale}
        />
        <ScrollView
          style={{ height: "100%" }}
          scrollEventThrottle={1}
          onScroll={(e) => {
            const scroll = e.nativeEvent.contentOffset.y;
            setImageScale(Math.max(0, Math.min(1, 1 - scroll / 250)));
          }}
        >
          <View
            style={{
              paddingHorizontal: 12,
              paddingTop: 250,
              paddingBottom: 50,
            }}
          >
            {new Array(50).fill(0).map((_, idx) => (
              <Card
                key={idx}
                style={{ backgroundColor: "rgba(0,0,0,0.3)", marginTop: 16 }}
              >
                <Card.Content>
                  <Text>Step {idx}: do some shit</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </ScrollView>
        <BackButton />
      </Portal.Host>
    </Screen>
  );
};

export default RecipeScreen;
