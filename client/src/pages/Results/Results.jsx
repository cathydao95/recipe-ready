import { useEffect, useState } from "react";
import { Loading, ResultsLayout } from "../../components";
import { useAppContext } from "../../context/appContext";
import { useLocation } from "react-router-dom";

const Results = () => {
  // Destructure from app context
  const { getRecipes, recipeResults, isLoading, setIsLoading } =
    useAppContext();
  // Obtain the current location
  const location = useLocation();

  // Load recipes based on the selected ingredients
  useEffect(() => {
    const { state } = location;
    // If ingredients are passed, set selectedIngredients to ingredients, else set as empty array
    const selectedIngredients =
      state && state.ingredients ? state.ingredients : [];
    // If keyword is passed, set keyword to the word, else set to empty string
    const keyword = state && state.keyword ? state.keyword : "";

    // Function to get recipes and passing in selected ingredients or keyword
    getRecipes(selectedIngredients, keyword);
  }, []);

  return (
    <ResultsLayout
      recipes={recipeResults}
      title="Recipe Results"
      page="searchResults"
      isLoading={isLoading}
    />
  );
};

export default Results;
