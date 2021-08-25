import BottomSheetBase from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useCallback, useRef, useState } from "react";
import { Keyboard, TextInput as NativeTextInput } from "react-native";
import { FAB, TextInput } from "react-native-paper";
import { RootStackParamList } from "../../../../App/App";
import BottomSheet from "../../../../components/BottomSheet";
import { useGlobalLoading } from "../../../../components/GlobalLoading";
import useOnNavigate from "../../../../hooks/useOnNavigate";
import useCreateRecipe from "./useCreateRecipe";

export interface AddSheetProps {}

const AddSheet: FC<AddSheetProps> = (props) => {
  const {} = props;
  const sheetRef = useRef<BottomSheetBase>(null);
  const inputRef = useRef<NativeTextInput>(null);
  const [forcedClose, setForcedClose] = useState(false);
  const [loading, setLoading] = useGlobalLoading();
  const [name, setName] = useState("");
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Recipe">>();
  const createRecipe = useCreateRecipe();

  const closeSheet = useCallback(() => {
    sheetRef.current?.close();
    inputRef.current?.blur();
    Keyboard.dismiss();
    setForcedClose(true);
  }, [sheetRef.current, inputRef]);
  useOnNavigate(closeSheet);

  const onBottomSheetChange = useCallback(
    (idx: number) => {
      if (idx < 1) {
        Keyboard.dismiss();
      }
      if (idx === -1) {
        setName("");
      }
      if (idx === 1) {
        inputRef.current?.focus();
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
          setForcedClose(false);
        }}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={["20%", "50%"]}
        onChange={onBottomSheetChange}
        enableOverDrag={false}
        title="Start a new recipe"
        enablePanDownToClose
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
            sheetRef.current?.expand({ duration: 200 });
          }}
          onBlur={() => {
            if (!forcedClose) sheetRef.current?.snapToIndex(0);
          }}
          onSubmitEditing={async () => {
            setLoading(true);
            const uid = await createRecipe(name);
            setLoading(false);
            closeSheet();
            navigate("Recipe", { uid });
          }}
        />
      </BottomSheet>
    </>
  );
};

export default AddSheet;
