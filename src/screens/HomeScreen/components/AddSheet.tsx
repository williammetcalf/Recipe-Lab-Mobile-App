import BottomSheet from "@gorhom/bottom-sheet";
import React, { FC, useCallback, useRef, useState } from "react";
import { Keyboard, TextInput as NativeTextInput, View } from "react-native";
import {
  FAB,
  IconButton,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { useGlobalLoading } from "../../../components/GlobalLoading";
import useOnNavigate from "../../../hooks/useOnNavigate";

export interface AddSheetProps {}

const AddSheet: FC<AddSheetProps> = (props) => {
  const {} = props;
  const { colors } = useTheme();
  const { surface } = colors;
  const sheetRef = useRef<BottomSheet>(null);
  const inputRef = useRef<NativeTextInput>(null);
  const { loading, setLoading } = useGlobalLoading();
  const [name, setName] = useState("");

  const closeSheet = useCallback(() => {
    sheetRef.current?.close();
    inputRef.current?.blur();
    Keyboard.dismiss();
  }, [sheetRef, inputRef]);
  useOnNavigate(closeSheet);

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
        snapPoints={["30%"]}
        backgroundStyle={{ backgroundColor: "#444" }}
        onChange={resetOnClose}
        enableOverDrag={false}
        handleComponent={() => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 12,
                paddingRight: 8,
              }}
            >
              <Title>Start A New Recipe</Title>
              <IconButton
                icon="close"
                size={24}
                onPress={closeSheet}
                disabled={loading}
              />
            </View>
          );
        }}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <TextInput
            ref={inputRef}
            label="Recipe Name"
            value={name}
            onChangeText={setName}
            style={{ backgroundColor: surface }}
            disabled={loading}
            onSubmitEditing={() => {
              setLoading(true);
              setTimeout(() => {
                alert("ok");
                closeSheet();
                setLoading(false);
              }, 10000);
            }}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default AddSheet;
