import { useEffect, useState } from "react";
import { Loading, ResultsLayout } from "../../components";
import { useAppContext } from "../../context/appContext";

const Results = () => {
  const { getRecipes, recipeResults, isLoading } = useAppContext();

  // const getCurrentUser = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8080/api/v1/users/current"
  //     );
  //     if (response.ok) {
  //       const {
  //         data: { user },
  //       } = await response.json();
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    getRecipes();
    // getCurrentUser();
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <ResultsLayout recipes={recipeResults} title="Recipe Results" />
  );
};

export default Results;
