import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App/App";
import Screen from "../../components/Screen";
import RecipeTitleCard from "./components/RecipeTitleCard";
import useRecipe from "./useRecipe";

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
  const recipe = useRecipe(uid);
  const { canGoBack, goBack } = useNavigation();

  return (
    <Screen>
      <SafeAreaView
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 12,
          height: "100%",
        }}
      >
        {canGoBack() && (
          <View style={{ flexDirection: "row" }}>
            <Button icon="arrow-left" onPress={goBack}>
              Back
            </Button>
          </View>
        )}
        <RecipeTitleCard recipeName={recipe?.name || ""} />
      </SafeAreaView>
    </Screen>
  );
};

export default RecipeScreen;
