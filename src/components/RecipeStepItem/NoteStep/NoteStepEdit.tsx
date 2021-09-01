import React, { FC } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { RecipeStepNote } from "../../../types/RecipeStepItem";
import { TextInput as TextInputNative, View } from "react-native";

export interface NoteStepEditProps {
  step?: RecipeStepNote;
  onSave: (step: RecipeStepNote) => void;
}

export const editNoteSnapPoints: [string, string, string] = [
  "10%",
  "20%",
  "50%",
];

const defaultNewStep: RecipeStepNote = {
  stepType: "note",
  noteText: "",
} as RecipeStepNote;

const NoteStepEdit: FC<NoteStepEditProps> = (props) => {
  const { step, onSave } = props;
  const [editedStep, setEditedStep] = useState(step || defaultNewStep);
  const inputRef = useRef<TextInputNative>(null);
  useEffect(() => {
    step && setEditedStep(step);
    inputRef.current?.focus();
  }, [step]);

  return (
    <View>
      <TextInput
        value={editedStep.noteText}
        onChangeText={(noteText) => setEditedStep({ ...editedStep, noteText })}
        ref={inputRef}
        label="Note"
      />
      <Button onPress={() => onSave(editedStep)}>Save</Button>
    </View>
  );
};

export default NoteStepEdit;
