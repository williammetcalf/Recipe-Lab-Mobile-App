import firebase from "firebase";
import { useCallback } from "react";
import { useCurrentUser } from "../../../../components/CurrentUserContext";
import { useGlobalLoading } from "../../../../components/GlobalLoading";

function useCreateRecipe() {
  const { uid } = useCurrentUser();
  const ref = firebase.database().ref("recipes").child(`${uid}`);
  const [, setLoading] = useGlobalLoading();

  return useCallback(
    (name: string) => {
      return new Promise<string>(async (resolve, reject) => {
        try {
          setLoading(true);
          const recipeRef = await ref.push({ name });
          resolve(recipeRef.key as string);
        } catch (err) {
          console.error(err);
          reject(err);
        } finally {
          setLoading(false);
        }
      });
    },
    [setLoading]
  );
}

export default useCreateRecipe;
