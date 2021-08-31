import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { RecipeStepNote } from "../../../types/RecipeStepItem";
import * as Haptics from "expo-haptics";

export interface NoteStepProps {
  step: RecipeStepNote;
  onEdit?: (step: RecipeStepNote) => void;
}

const NoteStep: FC<NoteStepProps> = (props) => {
  const { step, onEdit } = props;

  if (onEdit) {
    return (
      <TouchableOpacity
        onLongPress={() => {
          Haptics.impactAsync();
          onEdit(step);
        }}
        hitSlop={{ bottom: 4, top: 4 }}
        delayPressIn={100}
      >
        <Text>{step.noteText}</Text>
      </TouchableOpacity>
    );
  }

  return <Text>{step.noteText}</Text>;
};

export default NoteStep;
