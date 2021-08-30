import { isNumber } from "lodash";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { RecipeStepIngredient } from "../../types/RecipeStepItem";
import * as Haptics from "expo-haptics";

export interface IngredientStepProps {
  step: RecipeStepIngredient;
  onEdit: (step: RecipeStepIngredient) => void;
}

const IngredientStep: FC<IngredientStepProps> = (props) => {
  const { step, onEdit } = props;

  return (
    <TouchableOpacity
      onLongPress={() => {
        Haptics.impactAsync();
        onEdit(step);
      }}
      delayPressIn={100}
      style={{ paddingVertical: 4 }}
    >
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
    </TouchableOpacity>
  );
};

export default IngredientStep;
