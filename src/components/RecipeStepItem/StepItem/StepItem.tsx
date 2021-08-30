import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { Card } from "react-native-paper";
import useSurfaceColor from "../../../hooks/useSurfaceColor";
import {
  isGroup,
  isIngredient,
  isNote,
  RecipeStepItem,
} from "../../../types/RecipeStepItem";
import GroupStep from "../GroupStep";
import { IngredientStep } from "../IngredientStep";
import { NoteStep } from "../NoteStep";

export interface StepItemProps {
  step: RecipeStepItem;
  onEdit: (step: RecipeStepItem) => void;
}

const StepItem: FC<StepItemProps> = (props) => {
  const { step, onEdit } = props;
  const surfaceColor = useSurfaceColor();

  if (isNote(step)) {
    return (
      <BlurView intensity={80} style={{ marginBottom: 12 }}>
        <Card style={{ backgroundColor: surfaceColor }}>
          <Card.Content>
            <NoteStep step={step} onEdit={onEdit} />
          </Card.Content>
        </Card>
      </BlurView>
    );
  } else if (isIngredient(step)) {
    return (
      <BlurView intensity={80} style={{ marginBottom: 12 }}>
        <Card style={{ backgroundColor: surfaceColor }}>
          <Card.Content>
            <IngredientStep step={step} onEdit={onEdit} />
          </Card.Content>
        </Card>
      </BlurView>
    );
  } else if (isGroup(step)) {
    return (
      <BlurView intensity={80} style={{ marginBottom: 12 }}>
        <Card style={{ backgroundColor: surfaceColor }}>
          <Card.Content>
            <GroupStep step={step} onEdit={onEdit} />
          </Card.Content>
        </Card>
      </BlurView>
    );
  }

  return null;
};

export default StepItem;
