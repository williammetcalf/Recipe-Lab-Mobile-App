import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { RootStackParamList } from "../../App/App";
import EmptyState from "../../components/EmptyState";
import { StepItem } from "../../components/RecipeStepItem/StepItem";
import ReorderableParallaxList from "../../components/ReorderableParallaxList";
import Screen from "../../components/Screen";
import {
  mapDataToFirebaseObject,
  mapListToFirebaseData,
} from "../../types/mapFirebaseData";
import { RecipeStepItem } from "../../types/RecipeStepItem";
import AddStepButton from "./components/AddStepButton";
import EditSheet from "./components/EditSheet";
import ParallaxHeader from "./components/ParallaxHeader";
import RecipeScreenHeader from "./components/RecipeScreenHeader";
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
  const [editStep, setEditStep] = useState<{
    step: RecipeStepItem;
    _parentUid?: string;
  } | null>(null);

  return (
    <Screen>
      <ReorderableParallaxList
        data={recipe?.steps || []}
        onReorder={(data) => {
          recipeRef
            .child("steps")
            .update(
              mapListToFirebaseData(
                data.map((step, idx) => ({ ...step, order: idx }))
              )
            );
        }}
        keyExtractor={(item) => `${item._uid}`}
        headerMinHeight={150}
        headerMaxHeight={300}
        headerImageSource={{
          uri: "https://firebasestorage.googleapis.com/v0/b/recipe-lab-96d4d.appspot.com/o/28e88ab4-1e2d-416e-bc13-3476d3fc690a?alt=media&token=f71a8b70-05df-45e7-bc7a-01ffbfbaf502",
        }}
        HeaderComponent={() => <ParallaxHeader recipeName={recipe?.name} />}
        contentStyle={{ paddingHorizontal: 4 }}
        renderItem={(item) => (
          <StepItem
            step={item.item}
            onEdit={isEditMode ? undefined : setEditStep}
            reordering={isEditMode}
          />
        )}
        reordering={isEditMode}
        ListEmptyComponent={() => (
          <EmptyState>Press "+" to add steps</EmptyState>
        )}
      />
      <RecipeScreenHeader
        isEditMode={isEditMode}
        onEditModeChange={setIsEditMode}
      />
      <AddStepButton
        onAddStep={(stepType: RecipeStepItem["stepType"]) =>
          setEditStep({ step: { stepType } as RecipeStepItem })
        }
      />
      <EditSheet
        step={editStep}
        onSave={(updatedStep, _parentUid) => {
          console.log(updatedStep, _parentUid);
          const { _uid } = updatedStep;
          if (!_uid) {
            recipeRef
              .child("steps")
              .push({ ...updatedStep, order: recipe?.steps.length || 0 });
          } else {
            recipeRef
              .child("steps")
              .child(updatedStep._uid)
              .update(mapDataToFirebaseObject(updatedStep));
          }
          setEditStep(null);
        }}
        onCancel={() => setEditStep(null)}
      />
    </Screen>
  );
};

export default RecipeScreen;
