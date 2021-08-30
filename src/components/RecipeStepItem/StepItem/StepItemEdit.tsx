import React, { FC } from "react";
import {
  isGroup,
  isIngredient,
  isNote,
  RecipeStepItem,
} from "../../../types/RecipeStepItem";
import IngredientStepEdit, {
  editIngredientSnapPoints,
} from "../IngredientStep/IngredientStepEdit";
import { NoteStepEdit } from "../NoteStep";
import { editNoteSnapPoints } from "../NoteStep/NoteStepEdit";

export interface StepItemEditProps {
  step: RecipeStepItem;
  onSave: (updatedStep: RecipeStepItem) => void;
}

const StepItemEdit: FC<StepItemEditProps> = (props) => {
  const { step, onSave } = props;

  if (isNote(step)) {
    return <NoteStepEdit step={step} onSave={onSave} />;
  } else if (isIngredient(step)) {
    return <IngredientStepEdit step={step} onSave={onSave} />;
  } else if (isGroup(step)) {
    return null;
  }
  return null;
};

export function getSnapPoints(
  step: RecipeStepItem | null
): [string, string, string] {
  if (!step) {
    return ["10%", "10%", "10%"];
  }
  if (isNote(step)) {
    return editNoteSnapPoints;
  } else if (isIngredient(step)) {
    return editIngredientSnapPoints;
  } else if (isGroup(step)) {
    return ["10%", "10%", "10%"];
  }
  return ["10%", "10%", "10%"];
}

export default StepItemEdit;
