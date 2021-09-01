import React, { FC } from "react";
import { Text } from "react-native-paper";
import { RecipeStepNote } from "../../../types/RecipeStepItem";

export interface NoteStepProps {
  step: RecipeStepNote;
}

const NoteStep: FC<NoteStepProps> = (props) => {
  const { step } = props;

  return (
    <Text style={{ fontStyle: "italic", opacity: 0.7 }}>{step.noteText}</Text>
  );
};

export default NoteStep;
