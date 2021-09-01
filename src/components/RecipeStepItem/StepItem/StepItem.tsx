import React, { FC } from "react";
import {
  isGroup,
  isIngredient,
  isNote,
  RecipeStepItem,
} from "../../../types/RecipeStepItem";
import Paper from "../../Paper";
import GroupStep from "../GroupStep";
import { IngredientStep } from "../IngredientStep";
import { NoteStep } from "../NoteStep";

export interface StepItemProps {
  step: RecipeStepItem;
  onEdit?: (step: RecipeStepItem) => void;
}

const StepItem: FC<StepItemProps> = (props) => {
  const { step, onEdit } = props;

  if (isNote(step)) {
    return (
      <Paper style={{ marginBottom: 12 }} alpha={0.2} blurIntensity={70}>
        <NoteStep step={step} onEdit={onEdit} />
      </Paper>
    );
  } else if (isIngredient(step)) {
    return (
      <Paper style={{ marginBottom: 12 }} alpha={0.2} blurIntensity={70}>
        <IngredientStep step={step} onEdit={onEdit} />
      </Paper>
    );
  } else if (isGroup(step)) {
    return (
      <Paper style={{ marginBottom: 12 }} alpha={0.2} blurIntensity={70}>
        <GroupStep step={step} onEdit={onEdit} />
      </Paper>
    );
  }

  return null;
};

export default StepItem;
