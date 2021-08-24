import { TouchableHighlight } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Color from "color";
import React, { FC, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { RootStackParamList } from "../../../App/App";
import { Recipe } from "../../../types/Recipe";

export interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: FC<RecipeCardProps> = (props) => {
  const { recipe } = props;
  const { colors } = useTheme();
  const { surface } = colors;
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Recipe">>();

  const cardColor = useMemo(
    () => Color(surface).alpha(0.1).toString(),
    [surface]
  );

  return (
    <Card style={[styles.card, { backgroundColor: cardColor }]}>
      <TouchableHighlight
        onPress={() => {
          navigate("Recipe", { uid: recipe._uid });
        }}
        underlayColor={cardColor}
      >
        <Card.Content style={styles.content}>
          <Text style={styles.title}>{recipe.name}</Text>
        </Card.Content>
      </TouchableHighlight>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
  },
  content: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default RecipeCard;
