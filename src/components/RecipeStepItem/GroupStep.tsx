import React, { FC, Fragment } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";
import {
  isIngredient,
  isNote,
  RecipeStepGroup,
  RecipeStepItem,
} from "../../types/RecipeStepItem";
import { IngredientStep } from "./IngredientStep";
import { NoteStep } from "./NoteStep";

export interface GroupStepProps {
  step: RecipeStepGroup;
  onEdit: (step: RecipeStepItem) => void;
}

const GroupStep: FC<GroupStepProps> = (props) => {
  const { step, onEdit } = props;

  return (
    <View style={{ flexDirection: "column" }}>
      {step.items.map((innerStep, idx) => {
        return (
          <Fragment key={innerStep._uid}>
            <View style={{ paddingVertical: 8 }}>
              {isNote(innerStep) && (
                <NoteStep step={innerStep} onEdit={onEdit} />
              )}
              {isIngredient(innerStep) && (
                <IngredientStep step={innerStep} onEdit={onEdit} />
              )}
            </View>
            {idx < step.items.length - 1 && <Divider />}
          </Fragment>
        );
      })}
    </View>
  );
};

export default GroupStep;
