import React, { FC } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-native-paper";
import { RecipeStepIngredient } from "../../../types/RecipeStepItem";
import TextInput from "../../TextInput";
import { TextInput as TextInputNative, View } from "react-native";

export interface IngredientStepEditProps {
  step?: RecipeStepIngredient;
  onSave: (step: RecipeStepIngredient) => void;
}

export const editIngredientSnapPoints: [string, string, string] = [
  "10%",
  "28%",
  "58%",
];

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
      <TextInput
        value={editedStep.ingredientName}
        onChangeText={(ingredientName) =>
          setEditedStep({ ...editedStep, ingredientName })
        }
      />
      <TextInput
        value={editedStep.ingredientNote}
        onChangeText={(ingredientNote) =>
          setEditedStep({ ...editedStep, ingredientNote })
        }
      />
      <Button onPress={() => onSave(editedStep)}>Save</Button>
    </View>
  );
};

export default IngredientStepEdit;
