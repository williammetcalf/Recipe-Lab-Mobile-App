import BottomSheetNative from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useCallback, useRef, useState } from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../../App/App";
import ParallaxHeader from "../../components/ParallaxHeader";
import { StepItem } from "../../components/RecipeStepItem/StepItem";
import Screen from "../../components/Screen";
import { Recipe } from "../../types/Recipe";
import { RecipeStepItem } from "../../types/RecipeStepItem";
import EditSheet from "./components/EditSheet";
import RecipeScreenHeader from "./components/RecipeScreenHeader";
import data from "./mock-data";
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
  const sheetRef = useRef<BottomSheetNative>(null);
  const [editStep, setEditStep] = useState<RecipeStepItem | null>(null);
  const [steps, setSteps] = useState(data);
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
          {steps.map((step) => {
            return (
              <StepItem
                key={step._uid}
                step={step}
                onEdit={(step) => {
                  setEditStep(step);
                  sheetRef.current?.expand();
                }}
              />
            );
          })}
        </View>
      </ParallaxHeader>
      <RecipeScreenHeader />
      <EditSheet
        step={editStep}
        onSave={() => {
          setEditStep(null);
        }}
        onCancel={() => {
          setEditStep(null);
        }}
      />
    </Screen>
  );
};

export default RecipeScreen;
