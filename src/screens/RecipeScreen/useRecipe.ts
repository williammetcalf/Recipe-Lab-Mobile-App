import { useCurrentUser } from "../../components/CurrentUserContext";
import firebase from "firebase";
import { useEffect, useState } from "react";
import { Recipe } from "../../types/Recipe";
import { mapFirebaseObject } from "../../types/mapFirebaseData";

function useRecipe(recipeUid: string) {
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
        setRecipe(mapFirebaseObject<Recipe>(snap.val(), snap.key as string));
      } else {
        setRecipe(undefined);
      }
    });

    return () => {
      recipeRef.off();
    };
  }, [recipeUid, userUid]);

  return recipe;
}

export default useRecipe;
