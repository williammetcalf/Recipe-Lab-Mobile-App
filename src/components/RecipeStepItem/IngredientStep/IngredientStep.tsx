import { isNumber } from "lodash";
import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { RecipeStepIngredient } from "../../../types/RecipeStepItem";

export interface IngredientStepProps {
  step: RecipeStepIngredient;
}

const IngredientStep: FC<IngredientStepProps> = (props) => {
  const { step } = props;

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>{step.ingredientName}</Text>
        <View style={{ flex: 1 }} />
        {step.quantity && <Text>{step.quantity} </Text>}
        {step.unit && (
          <Text>{`${step.unit}${
            isNumber(step.quantity) && step.quantity !== 1 ? "s" : ""
          }`}</Text>
        )}
      </View>
      {step.ingredientNote && (
        <Text style={{ fontStyle: "italic", opacity: 0.7 }}>
          {step.ingredientNote}
        </Text>
      )}
    </View>
  );
};

export default IngredientStep;
