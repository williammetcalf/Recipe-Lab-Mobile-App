import BottomSheet from "@gorhom/bottom-sheet";
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
import { useGlobalLoading } from "../../../../components/GlobalLoading";
import useOnNavigate from "../../../../hooks/useOnNavigate";
import useCreateRecipe from "./useCreateRecipe";

export interface AddSheetProps {}

const AddSheet: FC<AddSheetProps> = (props) => {
  const {} = props;
  const { colors } = useTheme();
  const { surface } = colors;
  const sheetRef = useRef<BottomSheet>(null);
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
        index={-1}
        snapPoints={["20%", "50%"]}
        backgroundStyle={{
          backgroundColor: Color(surface).darken(0.8).toString(),
        }}
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
