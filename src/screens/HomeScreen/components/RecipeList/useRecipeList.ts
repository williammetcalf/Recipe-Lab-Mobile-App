import { useCurrentUser } from "../../../../components/CurrentUserContext";
import firebase from "firebase";
import { useEffect, useState } from "react";
import { Recipe } from "../../../../types/Recipe";
import mapFirebaseList from "../../../../types/mapFirebaseList";

function useRecipeList() {
  const { uid } = useCurrentUser();
  const [list, setList] = useState<Recipe[]>([]);

  useEffect(() => {
    console.log("sub");
    const recipeListRef = firebase.database().ref("recipes").child(uid);

    recipeListRef.on("value", (snap) => {
      if (snap.exists()) {
        setList(mapFirebaseList(snap.val()));
      } else {
        setList([]);
      }
    });

    return () => {
      console.log("unsub");
      recipeListRef.off();
    };
  }, [uid]);

  return list;
}

export default useRecipeList;
