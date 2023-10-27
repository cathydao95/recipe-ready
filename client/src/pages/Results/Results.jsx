import { useEffect, useState } from "react";
import { Loading, ResultsLayout } from "../../components";

const Results = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getRecipes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/recipes", {
        credentials: "include",
      });
      if (response.ok) {
        const {
          data: { recipes },
        } = await response.json();
        setRecipes(recipes);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  // useEffect(() => {
  //   getRecipes();
  //   // getCurrentUser();
  // }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <ResultsLayout recipes={recipes} title="Recipe Results" />
  );
};

export default Results;
