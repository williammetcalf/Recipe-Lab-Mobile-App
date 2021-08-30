import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { RecipeStepNote } from "../../types/RecipeStepItem";
import * as Haptics from "expo-haptics";

export interface NoteStepProps {
  step: RecipeStepNote;
  onEdit: (step: RecipeStepNote) => void;
}

const NoteStep: FC<NoteStepProps> = (props) => {
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
      <Text>{step.noteText}</Text>
    </TouchableOpacity>
  );
};

export default NoteStep;
