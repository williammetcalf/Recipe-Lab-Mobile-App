import BottomSheetNative from "@gorhom/bottom-sheet";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { Keyboard, View } from "react-native";
import { Portal } from "react-native-paper";
import BottomSheet from "../../../components/BottomSheet";
import { StepItemEdit } from "../../../components/RecipeStepItem/StepItem";
import { RecipeStepItem } from "../../../types/RecipeStepItem";

export interface EditSheetProps {
  step: RecipeStepItem | null;
  onSave: (updatedStep: RecipeStepItem) => void;
  onCancel: () => void;
}

const EditSheet: FC<EditSheetProps> = (props) => {
  const { step, onSave, onCancel } = props;
  const sheetRef = useRef<BottomSheetNative>(null);
  const closeSheet = useCallback(() => {
    if (sheetRef.current) {
      sheetRef.current.close();
      Keyboard.dismiss();
    }
  }, [sheetRef]);

  useEffect(() => {
    const unsubKeyboard = Keyboard.addListener("keyboardWillShow", () => {
      sheetRef.current?.expand();
    });
    return () => {
      Keyboard.removeSubscription(unsubKeyboard);
    };
  }, [sheetRef]);

  useEffect(() => {
    !step && closeSheet();
    step && sheetRef.current?.expand();
  }, [step, closeSheet]);

  return (
    <Portal>
      <BottomSheet
        title="Edit Step"
        onClose={() => {
          sheetRef.current?.close();
        }}
        snapPoints={["10%", "50%"]}
        ref={sheetRef}
        enablePanDownToClose
        onChange={(idx) => {
          idx === -1 && onCancel();
        }}
      >
        <View>{step && <StepItemEdit step={step} onSave={onSave} />}</View>
      </BottomSheet>
    </Portal>
  );
};

export default EditSheet;
