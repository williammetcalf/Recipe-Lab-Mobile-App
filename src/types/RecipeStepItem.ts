import { FirebaseObject } from "./FirebaseObject";

export interface RecipeStepItem extends FirebaseObject {
  stepType: "note" | "ingredient" | "group";
}

export interface RecipeStepNote extends RecipeStepItem {
  stepType: "note";
  noteText: string;
  imageUrl?: string;
}

export interface RecipeStepIngredient extends RecipeStepItem {
  stepType: "ingredient";
  ingredientName: string;
  quantity?: string;
  unit?: string;
  ingredientNote?: string;
}

export interface RecipeStepGroup extends RecipeStepItem {
  stepType: "group";
  items: (RecipeStepNote | RecipeStepGroup)[];
}
