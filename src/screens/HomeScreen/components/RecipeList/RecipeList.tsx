import React, { FC } from "react";
import { ScrollView } from "react-native-gesture-handler";
import RecipeCard from "../RecipeCard";
import useRecipeList from "./useRecipeList";

export interface RecipeListProps {
  filter?: string;
}

const RecipeList: FC<RecipeListProps> = (props) => {
  const { filter } = props;
  const recipeList = useRecipeList();
  const filteredRecipeList = filter
    ? recipeList.filter((recipe) => recipe.name.includes(filter))
    : recipeList;

  return (
    <ScrollView>
      {filteredRecipeList.map((recipe) => (
        <RecipeCard key={recipe._uid} recipe={recipe} />
      ))}
    </ScrollView>
  );
};

export default RecipeList;
