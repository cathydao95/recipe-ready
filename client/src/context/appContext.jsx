import { useState, createContext, useEffect, useContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [recipeResults, setRecipeResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recipeInfo, setRecipeInfo] = useState([]);

  const getRecipes = async (ingredients, keyword) => {
    try {
      let queryParam = "";

      if (ingredients && ingredients.length > 0) {
        queryParam += `?ingredients=${ingredients.join(",")}`;
      }

      if (keyword && keyword !== "") {
        queryParam += `?keyword=${keyword}`;
      }

      console.log(queryParam);

      const response = await fetch(
        `http://localhost:8080/api/v1/recipes${queryParam}`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const {
          data: { recipes },
        } = await response.json();
        setRecipeResults(recipes);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{ getRecipes, recipeInfo, recipeResults, isLoading, setIsLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
