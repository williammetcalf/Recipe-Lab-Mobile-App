import React, { FC, useState } from "react";
import { FAB, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecipeStepItem } from "../../../types/RecipeStepItem";

export interface AddStepButtonProps {
  onAddStep: (stepType: RecipeStepItem["stepType"]) => void;
}

const AddStepButton: FC<AddStepButtonProps> = (props) => {
  const { onAddStep } = props;
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView style={{ position: "absolute", bottom: 32, right: 20 }}>
      <Portal>
        <FAB.Group
          visible={true}
          open={open}
          icon={open ? "close" : "plus"}
          actions={[
            {
              icon: "group",
              label: "Step Group",
              onPress: () => onAddStep("group"),
            },
            {
              icon: "pencil-box",
              label: "Note",
              onPress: () => onAddStep("note"),
            },
            {
              icon: "food-apple",
              label: "Ingredient",
              onPress: () => onAddStep("ingredient"),
              small: false,
            },
          ]}
          onStateChange={(s) => setOpen(s.open)}
        />
      </Portal>
    </SafeAreaView>
  );
};

export default AddStepButton;
