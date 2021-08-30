import {
  RecipeStepGroup,
  RecipeStepIngredient,
  RecipeStepItem,
  RecipeStepNote,
} from "../../types/RecipeStepItem";

const mockData: RecipeStepItem[] = [
  {
    stepType: "ingredient",
    ingredientName: "Flour",
    ingredientNote: "weighing flour < measuring cup",
    quantity: 4,
    unit: "cup",
    _uid: "i1",
  } as RecipeStepIngredient,
  {
    stepType: "group",
    items: [
      {
        stepType: "ingredient",
        ingredientName: "Milk",
        ingredientNote: "whole milk is best, 2% okay",
        quantity: 2,
        unit: "cup",
        _uid: "i2",
      } as RecipeStepIngredient,
      {
        stepType: "note",
        noteText: "This is another note",
        _uid: "n13",
      } as RecipeStepNote,
      {
        stepType: "ingredient",
        ingredientName: "water",
        _uid: "i3",
      } as RecipeStepIngredient,
    ] as RecipeStepItem[],
    _uid: "g1",
  } as RecipeStepGroup,
  {
    stepType: "note",
    noteText: "This is a sample note item",
    _uid: "n1",
  } as RecipeStepNote,
  {
    stepType: "note",
    noteText: "This is another sample note item",
    _uid: "n2",
  } as RecipeStepNote,
  {
    stepType: "note",
    noteText: "This is a third sample note item",
    _uid: "n3",
  } as RecipeStepNote,
  {
    stepType: "note",
    noteText: "This is a sample note item",
    _uid: "n4",
  } as RecipeStepNote,
  {
    stepType: "note",
    noteText: "This is another sample note item",
    _uid: "n5",
  } as RecipeStepNote,
  {
    stepType: "note",
    noteText: "This is a third sample note item",
    _uid: "n6",
  } as RecipeStepNote,
  {
    stepType: "note",
    noteText: "This is a sample note item",
    _uid: "n7",
  } as RecipeStepNote,
  {
    stepType: "note",
    noteText: "This is another sample note item",
    _uid: "n8",
  } as RecipeStepNote,
  {
    stepType: "note",
    noteText: "This is a third sample note item",
    _uid: "n9",
  } as RecipeStepNote,
  {
    stepType: "note",
    noteText: "This is a sample note item",
    _uid: "n10",
  } as RecipeStepNote,
  {
    stepType: "note",
    noteText: "This is another sample note item",
    _uid: "n11",
  } as RecipeStepNote,
  {
    stepType: "note",
    noteText: "This is a third sample note item",
    _uid: "n12",
  } as RecipeStepNote,
];

export default mockData;
