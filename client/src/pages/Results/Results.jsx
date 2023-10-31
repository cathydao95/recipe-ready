import { useEffect, useState } from "react";
import { Loading, ResultsLayout } from "../../components";
import { useAppContext } from "../../context/appContext";
import { useLocation } from "react-router-dom";

const Results = () => {
  const { getRecipes, recipeResults, isLoading, setIsLoading } =
    useAppContext();
  const location = useLocation();

  useEffect(() => {
    const { state } = location;
    const selectedIngredients =
      state && state.ingredients ? state.ingredients : [];

    const keyword = state && state.keyword ? state.keyword : "";

    // Use selectedIngredients to call getRecipes
    getRecipes(selectedIngredients, keyword);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <ResultsLayout
      recipes={recipeResults}
      title="Recipe Results"
      name="searchResults"
    />
  );
};

export default Results;
