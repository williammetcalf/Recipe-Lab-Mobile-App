import React, { FC } from "react";
import {
  isGroup,
  isIngredient,
  isNote,
  RecipeStepItem,
} from "../../../types/RecipeStepItem";
import { NoteStepEdit } from "../NoteStep";

export interface StepItemEditProps {
  step: RecipeStepItem;
  onSave: (updatedStep: RecipeStepItem) => void;
}

const StepItemEdit: FC<StepItemEditProps> = (props) => {
  const { step, onSave } = props;

  if (isNote(step)) {
    return <NoteStepEdit step={step} onSave={onSave} />;
  } else if (isIngredient(step)) {
    return null;
  } else if (isGroup(step)) {
    return null;
  }
  return null;
};

export default StepItemEdit;
