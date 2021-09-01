import { TouchableHighlight } from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import React, { FC, Fragment } from "react";
import { View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
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
  onEdit?: (step: { step: RecipeStepItem; _parentUid?: string }) => void;
  reordering?: boolean;
}

const GroupStep: FC<GroupStepProps> = (props) => {
  const { step, onEdit } = props;
  const { roundness } = useTheme();

  return (
    <View style={{ flexDirection: "column" }}>
      {step.items.map((innerStep, idx) => {
        const onLongPress = onEdit
          ? () => {
              Haptics.impactAsync();
              onEdit({ step: innerStep, _parentUid: step._uid });
            }
          : undefined;
        return (
          <Fragment key={innerStep._uid}>
            <View style={{ paddingVertical: 8 }}>
              {isNote(innerStep) && (
                <TouchableHighlight
                  onLongPress={onLongPress}
                  style={{
                    padding: 8,
                    borderRadius: roundness,
                  }}
                  underlayColor="rgba(255,255,255,0.2)"
                >
                  <NoteStep step={innerStep} />
                </TouchableHighlight>
              )}
              {isIngredient(innerStep) && (
                <TouchableHighlight
                  onLongPress={onLongPress}
                  style={{ padding: 8, borderRadius: roundness }}
                  underlayColor="rgba(255,255,255,0.2)"
                >
                  <IngredientStep step={innerStep} />
                </TouchableHighlight>
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
