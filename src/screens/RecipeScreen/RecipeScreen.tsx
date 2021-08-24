import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../../App/App";
import Screen from "../../components/Screen";

export type RecipeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Recipe"
>;
export interface RecipeScreenNavigationProps {
  uid: string;
}

const RecipeScreen: FC<RecipeScreenProps> = (props) => {
  const { route } = props;
  const { uid } = route.params;
  console.log(uid);

  return (
    <Screen>
      <Text>Recipe Page</Text>
    </Screen>
  );
};

export default RecipeScreen;
