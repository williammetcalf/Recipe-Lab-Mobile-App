import BottomSheetNative from "@gorhom/bottom-sheet";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, View } from "react-native";
import { Portal } from "react-native-paper";
import BottomSheet from "../../../components/BottomSheet";
import { StepItemEdit } from "../../../components/RecipeStepItem/StepItem";
import { getSnapPoints } from "../../../components/RecipeStepItem/StepItem/StepItemEdit";
import { RecipeStepItem } from "../../../types/RecipeStepItem";

export interface EditSheetProps {
  step: {
    step: RecipeStepItem;
    _parentUid?: string;
  } | null;
  onSave: (updatedStep: RecipeStepItem, _parentUid?: string) => void;
  onCancel: () => void;
}

const EditSheet: FC<EditSheetProps> = (props) => {
  const { step, onSave, onCancel } = props;
  const [forceClose, setForceClose] = useState(false);
  const sheetRef = useRef<BottomSheetNative>(null);
  const closeSheet = useCallback(() => {
    if (sheetRef.current) {
      sheetRef.current.close();
      Keyboard.dismiss();
    }
  }, [sheetRef]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardWillShow", () => {
      sheetRef.current?.expand();
    });
    const hideSub = Keyboard.addListener("keyboardWillHide", () => {
      !forceClose && sheetRef.current?.snapToIndex(1);
    });
    return () => {
      Keyboard.removeSubscription(showSub);
      Keyboard.removeSubscription(hideSub);
    };
  }, [sheetRef, forceClose]);

  useEffect(() => {
    if (step) {
      const startingSnapPont = step.step.stepType === "note" ? 2 : 1;
      sheetRef.current?.snapToPosition(
        getSnapPoints(step.step)[startingSnapPont]
      );
    } else {
      closeSheet();
    }
  }, [step, closeSheet]);

  return (
    <Portal>
      <BottomSheet
        title="Edit Step"
        onClose={() => {
          setForceClose(true);
          closeSheet();
        }}
        snapPoints={getSnapPoints(step?.step || null)}
        ref={sheetRef}
        onChange={(idx) => {
          idx >= 0 && setForceClose(false);
          idx === -1 && onCancel();
        }}
      >
        <View>
          {step && (
            <StepItemEdit
              step={step.step}
              onSave={(updatedStep) => {
                setForceClose(true);
                onSave(updatedStep, step._parentUid);
              }}
            />
          )}
        </View>
      </BottomSheet>
    </Portal>
  );
};

export default EditSheet;
