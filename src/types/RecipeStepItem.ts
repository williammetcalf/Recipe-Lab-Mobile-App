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
  quantity?: number;
  unit?: string;
  ingredientNote?: string;
}

export interface RecipeStepGroup extends RecipeStepItem {
  stepType: "group";
  items: (RecipeStepNote | RecipeStepIngredient)[];
}

export function isNote(step: RecipeStepItem): step is RecipeStepNote {
  return step.stepType === "note";
}

export function isIngredient(
  step: RecipeStepItem
): step is RecipeStepIngredient {
  return step.stepType === "ingredient";
}

export function isGroup(step: RecipeStepItem): step is RecipeStepGroup {
  return step.stepType === "group";
}
