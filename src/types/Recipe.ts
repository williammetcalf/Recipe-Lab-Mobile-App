import { FirebaseObject } from "./FirebaseObject";
import { RecipeStepItem } from "./RecipeStepItem";

export interface Recipe extends FirebaseObject {
  name: string;
  imageUri: string;
  steps: RecipeStepItem[];
}
