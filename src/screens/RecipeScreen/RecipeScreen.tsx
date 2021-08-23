import React, { FC } from "react";
import { Text } from "react-native-paper";
import Screen from "../../components/Screen";

export interface RecipeScreenProps {}

const RecipeScreen: FC<RecipeScreenProps> = (props) => {
  const {} = props;

  return (
    <Screen>
      <Text>Recipe Page</Text>
    </Screen>
  );
};

export default RecipeScreen;
