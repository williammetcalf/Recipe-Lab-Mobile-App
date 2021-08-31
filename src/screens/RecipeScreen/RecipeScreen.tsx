import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import React, { FC, useCallback, useState } from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../../App/App";
import { StepItem } from "../../components/RecipeStepItem/StepItem";
import ReorderableParallaxList from "../../components/ReorderableParallaxList";
import Screen from "../../components/Screen";
import { Recipe } from "../../types/Recipe";
import { RecipeStepItem } from "../../types/RecipeStepItem";
import AddStepButton from "./components/AddStepButton";
import EditSheet from "./components/EditSheet";
import ParallaxHeader from "./components/ParallaxHeader";
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
  const [isEditMode, setIsEditMode] = useState(false);
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
      <ReorderableParallaxList
        data={steps}
        onReorder={setSteps}
        keyExtractor={(item) => `${item._uid}`}
        headerMinHeight={150}
        headerMaxHeight={300}
        headerImageSource={{
          uri: "https://firebasestorage.googleapis.com/v0/b/recipe-lab-96d4d.appspot.com/o/28e88ab4-1e2d-416e-bc13-3476d3fc690a?alt=media&token=f71a8b70-05df-45e7-bc7a-01ffbfbaf502",
        }}
        HeaderComponent={() => <ParallaxHeader recipeName={recipe?.name} />}
        renderItem={(item) => (
          <StepItem
            step={item.item}
            onEdit={isEditMode ? undefined : setEditStep}
          />
        )}
        reordering={isEditMode}
      />
      <RecipeScreenHeader
        isEditMode={isEditMode}
        onEditModeChange={setIsEditMode}
      />
      <AddStepButton />
      <EditSheet
        step={editStep}
        onSave={() => setEditStep(null)}
        onCancel={() => setEditStep(null)}
      />
    </Screen>
  );
};

export default RecipeScreen;
