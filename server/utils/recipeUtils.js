// Function to format ingredients string
export const prepareIngredients = (ingredients) => {
  let ingredientsArray = ingredients;
  // Split by comma and trim whitespace, if ingredients is not an array
  if (!Array.isArray(ingredients)) {
    ingredientsArray = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
  }
  // Return ingredients as a formatted string in curly brace as needed by DB
  return `{${ingredientsArray.join(",")}}`;
};
