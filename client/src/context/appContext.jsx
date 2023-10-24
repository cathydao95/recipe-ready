import { useState, createContext, useEffect, useContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [recipeResults, setRecipeResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recipeInfo, setRecipeInfo] = useState([]);

  const getRecipes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/recipes", {
        credentials: "include",
      });
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
