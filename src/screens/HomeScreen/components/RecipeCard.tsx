import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../../../App/App";
import Paper from "../../../components/Paper";
import { Recipe } from "../../../types/Recipe";

export interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: FC<RecipeCardProps> = (props) => {
  const { recipe } = props;
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Recipe">>();

  return (
    <Paper
      style={{ marginTop: 12 }}
      onPress={() => navigate("Recipe", { uid: recipe._uid })}
    >
      <Text style={styles.title}>{recipe.name}</Text>
    </Paper>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
});

export default RecipeCard;
