import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import React, { FC, useCallback } from "react";
import { useRef } from "react";
import { View } from "react-native";
import { Portal, Text, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App/App";
import BottomSheet from "../../components/BottomSheet";
import ParallaxHeader from "../../components/ParallaxHeader";
import StepItem from "../../components/RecipeStepItem/StepItem";
import Screen from "../../components/Screen";
import { Recipe } from "../../types/Recipe";
import RecipeScreenHeader from "./components/RecipeScreenHeader";
import data from "./mock-data";
import useRecipe from "./useRecipe";
import BottomSheetNative from "@gorhom/bottom-sheet";
import { useState } from "react";
import { RecipeStepItem } from "../../types/RecipeStepItem";

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
          {data.map((step) => {
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
      <Portal>
        <BottomSheet
          title="Edit Step"
          onClose={() => sheetRef.current?.close()}
          snapPoints={["10%", "50%"]}
          ref={sheetRef}
          style={{ zIndex: 1000 }}
          enablePanDownToClose
        >
          <View>
            <Text>{JSON.stringify(editStep)}</Text>
          </View>
        </BottomSheet>
      </Portal>
    </Screen>
  );
};

export default RecipeScreen;
