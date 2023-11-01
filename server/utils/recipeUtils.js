// Function to format ingredients string
export const prepareIngredients = (ingredients) => {
  let ingredientsArray = ingredients;
  if (!Array.isArray(ingredients)) {
    ingredientsArray = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
  }
  return `{${ingredientsArray.join(",")}}`;
};
