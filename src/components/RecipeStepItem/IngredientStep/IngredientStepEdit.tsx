import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { RecipeStepIngredient } from "../../../types/RecipeStepItem";
import TypeAhead from "../../TypeAhead";

export interface IngredientStepEditProps {
  step?: RecipeStepIngredient;
  onSave: (step: RecipeStepIngredient) => void;
}

export const editIngredientSnapPoints: [string, string, string] = [
  "10%",
  "50%",
  "80%",
];

const ingredients: string[] = ["Milk", "Flour", "Water", "Eggs", "Whole Milk"];

const defaultNewStep: RecipeStepIngredient = {
  stepType: "ingredient",
  ingredientName: "",
} as RecipeStepIngredient;

const IngredientStepEdit: FC<IngredientStepEditProps> = (props) => {
  const { step, onSave } = props;
  const [editedStep, setEditedStep] = useState(step || defaultNewStep);
  useEffect(() => {
    step && setEditedStep(step);
  }, [step]);

  return (
    <View>
      <TypeAhead
        items={ingredients}
        style={{ backgroundColor: "transparent" }}
        value={editedStep.ingredientName}
        onChangeText={(ingredientName) =>
          setEditedStep({ ...editedStep, ingredientName })
        }
        label="Ingredient Name"
      />

      <Button
        onPress={() => {
          onSave(editedStep);
        }}
      >
        save
      </Button>
    </View>
  );
};

export default IngredientStepEdit;
