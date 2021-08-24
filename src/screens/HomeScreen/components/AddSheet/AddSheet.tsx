import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Color from "color";
import React, { FC, useCallback, useRef, useState } from "react";
import { Keyboard, TextInput as NativeTextInput, View } from "react-native";
import {
  FAB,
  IconButton,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { RootStackParamList } from "../../../../App/App";
import BottomSheet from "../../../../components/BottomSheet";
import { useGlobalLoading } from "../../../../components/GlobalLoading";
import useOnNavigate from "../../../../hooks/useOnNavigate";
import useCreateRecipe from "./useCreateRecipe";
import BottomSheetBase from "@gorhom/bottom-sheet";

export interface AddSheetProps {}

const AddSheet: FC<AddSheetProps> = (props) => {
  const {} = props;
  const { colors } = useTheme();
  const { surface } = colors;
  const sheetRef = useRef<BottomSheetBase>(null);
  const inputRef = useRef<NativeTextInput>(null);
  const [loading, setLoading] = useGlobalLoading();
  const [name, setName] = useState("");
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Recipe">>();
  const createRecipe = useCreateRecipe();

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
          sheetRef.current?.expand();
          inputRef.current?.focus();
        }}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={["20%", "50%"]}
        onChange={resetOnClose}
        enableOverDrag={false}
        title="Start a new recipe"
        onClose={closeSheet}
      >
        <TextInput
          ref={inputRef}
          label="Recipe Name"
          value={name}
          onChangeText={setName}
          style={{ backgroundColor: "transparent" }}
          disabled={loading}
          onFocus={() => {
            sheetRef.current?.expand({ duration: 100 });
          }}
          onBlur={() => {
            sheetRef.current?.snapToIndex(0);
          }}
          onSubmitEditing={async () => {
            setLoading(true);
            const uid = await createRecipe(name);
            closeSheet();
            // navigate("Recipe", { uid });
          }}
        />
      </BottomSheet>
    </>
  );
};

export default AddSheet;
