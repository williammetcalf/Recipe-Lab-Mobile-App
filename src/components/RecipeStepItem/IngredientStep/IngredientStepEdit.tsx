import { isNumber } from "lodash";
import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { RecipeStepIngredient } from "../../../types/RecipeStepItem";
import TypeAhead from "../../TypeAhead";

export interface IngredientStepEditProps {
  step?: RecipeStepIngredient;
  onSave: (step: RecipeStepIngredient) => void;
}

export const editIngredientSnapPoints: [string, string, string] = [
  "10%",
  "40%",
  "70%",
];

const ingredients: string[] = ["Milk", "Flour", "Water", "Eggs", "Whole Milk"];
const units: string[] = ["Cup(s)", "Tb(s)", "Tspn(s)", "gram(s)", "ounce(s)"];

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
  const { ingredientName, quantity, unit, ingredientNote } = editedStep;

  return (
    <View>
      <TypeAhead
        items={ingredients}
        textInputStyle={{ backgroundColor: "transparent" }}
        value={ingredientName}
        onChangeText={(ingredientName) =>
          setEditedStep({ ...editedStep, ingredientName })
        }
        label="Ingredient Name*"
      />
      <View style={{ flexDirection: "row", width: "100%" }}>
        <TextInput
          value={isNumber(quantity) ? `${quantity}` : undefined}
          onChangeText={(v) => {
            console.log("here", v);
            setEditedStep({ ...editedStep, quantity: v ? +v : null });
          }}
          style={{ flex: 1, marginRight: 4, backgroundColor: "transparent" }}
          keyboardType="decimal-pad"
          label="Quantity"
        />
        <TypeAhead
          items={units}
          value={unit ? unit : undefined}
          onChangeText={(unit) =>
            setEditedStep({ ...editedStep, unit: unit ? unit : null })
          }
          textInputStyle={{ backgroundColor: "transparent" }}
          containerStyle={{ flex: 1, marginLeft: 4 }}
          label="Unit"
        />
      </View>
      <TextInput
        value={ingredientNote ? ingredientNote : undefined}
        style={{ backgroundColor: "transparent", marginTop: 32 }}
        label="Additional Note"
        onChangeText={(ingredientNote) =>
          setEditedStep({
            ...editedStep,
            ingredientNote: ingredientNote ? ingredientNote : null,
          })
        }
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
