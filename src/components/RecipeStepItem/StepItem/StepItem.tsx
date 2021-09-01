import React, { FC } from "react";
import {
  isGroup,
  isIngredient,
  isNote,
  RecipeStepItem,
} from "../../../types/RecipeStepItem";
import GroupStep from "../GroupStep";
import { IngredientStep } from "../IngredientStep";
import { NoteStep } from "../NoteStep";
import StepContainer from "../StepContainer";

export interface StepItemProps {
  step: RecipeStepItem;
  onEdit?: (step: { step: RecipeStepItem; _parentUid?: string }) => void;
  reordering?: boolean;
}

const StepItem: FC<StepItemProps> = (props) => {
  const { step, onEdit, reordering } = props;

  if (isNote(step)) {
    return (
      <StepContainer onEdit={onEdit ? () => onEdit({ step }) : undefined}>
        <NoteStep step={step} />
      </StepContainer>
    );
  } else if (isIngredient(step)) {
    return (
      <StepContainer onEdit={onEdit ? () => onEdit({ step }) : undefined}>
        <IngredientStep step={step} />
      </StepContainer>
    );
  } else if (isGroup(step)) {
    return (
      <StepContainer onEdit={onEdit ? () => onEdit({ step }) : undefined}>
        <GroupStep step={step} onEdit={onEdit} reordering={reordering} />
      </StepContainer>
    );
  }

  return null;
};

export default StepItem;
