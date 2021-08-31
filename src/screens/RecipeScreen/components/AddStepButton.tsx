import React, { FC, useState } from "react";
import { FAB, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export interface AddStepButtonProps {}

const AddStepButton: FC<AddStepButtonProps> = (props) => {
  const {} = props;
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
              onPress: () => console.log("Pressed star"),
            },
            {
              icon: "pencil-box",
              label: "Note",
              onPress: () => console.log("Pressed note"),
            },
            {
              icon: "food-apple",
              label: "Ingredient",
              onPress: () => console.log("Pressed email"),
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
