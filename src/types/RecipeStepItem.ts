import { FirebaseObject } from "./FirebaseObject";

export interface RecipeStepItem extends FirebaseObject {
  stepType: "note" | "ingredient" | "group";
  order: number;
}

export interface RecipeStepNote extends RecipeStepItem {
  stepType: "note";
  noteText: string;
  imageUrl: string | null;
}

export interface RecipeStepIngredient extends RecipeStepItem {
  stepType: "ingredient";
  ingredientName: string;
  quantity: number | null;
  unit: string | null;
  ingredientNote: string | null;
}

export interface RecipeStepGroup extends RecipeStepItem {
  stepType: "group";
  items: (RecipeStepNote | RecipeStepIngredient)[];
  groupLabel: string | null;
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
