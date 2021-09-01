import { useCurrentUser } from "../../components/CurrentUserContext";
import firebase from "firebase";
import { useEffect, useState } from "react";
import { Recipe } from "../../types/Recipe";
import {
  mapFirebaseList,
  mapFirebaseObject,
} from "../../types/mapFirebaseData";
import { RecipeStepItem } from "../../types/RecipeStepItem";

function useRecipe(
  recipeUid: string
): [Recipe | undefined, firebase.database.Reference] {
  const [recipe, setRecipe] = useState<Recipe>();
  const userUid = useCurrentUser().uid;
  const recipeRef = firebase
    .database()
    .ref("recipes")
    .child(userUid)
    .child(recipeUid);

  useEffect(() => {
    recipeRef.on("value", (snap) => {
      if (snap.exists()) {
        const recipe = mapFirebaseObject<Recipe>(
          snap.val(),
          snap.key as string
        );
        recipe.steps = mapFirebaseList<RecipeStepItem>(
          recipe.steps as any
        ).sort((a, b) => a.order - b.order);
        setRecipe(recipe);
      } else {
        setRecipe(undefined);
      }
    });

    return () => {
      recipeRef.off();
    };
  }, [recipeUid, userUid]);

  return [recipe, recipeRef];
}

export default useRecipe;
