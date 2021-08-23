import BottomSheet from "@gorhom/bottom-sheet";
import React, { FC, useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Keyboard, View, TextInput as NativeTextInput } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { FAB, TextInput, Title } from "react-native-paper";

export interface AddSheetProps {}

const AddSheet: FC<AddSheetProps> = (props) => {
  const {} = props;
  const sheetRef = useRef<BottomSheet>(null);
  const inputRef = useRef<NativeTextInput>(null);
  const [name, setName] = useState("");
  const resetOnClose = useCallback(
    (idx: number) => {
      if (idx === -1) {
        setName("");
        Keyboard.dismiss();
      }
    },
    [setName]
  );

  return (
    <>
      <FAB
        icon="plus"
        style={{ position: "absolute", bottom: 32, right: 20 }}
        onPress={() => {
          sheetRef.current?.snapToIndex(0);
          inputRef.current?.focus();
        }}
      />
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={["35%"]}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: "#555" }}
        onChange={resetOnClose}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ height: "100%" }}
        >
          <View style={{ padding: 16 }}>
            <Title>Start A New Recipe</Title>
            <TextInput
              ref={inputRef}
              label="Recipe Name"
              value={name}
              onChangeText={setName}
              returnKeyType="done"
              enablesReturnKeyAutomatically
              onSubmitEditing={(e) => {
                Keyboard.dismiss();
                alert("done");
              }}
              onBlur={() => {
                sheetRef.current?.close();
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </BottomSheet>
    </>
  );
};

export default AddSheet;
