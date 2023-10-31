import { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [recipeResults, setRecipeResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usersRecipes, setUsersRecipes] = useState([]);
  const [usersBookmarked, setUsersBookmarked] = useState([]);
  const getRecipes = async (ingredients, keyword) => {
    try {
      let queryParam = "";

      if (ingredients && ingredients.length > 0) {
        queryParam += `?ingredients=${ingredients.join(",")}`;
      }

      if (keyword && keyword !== "") {
        queryParam += `?keyword=${keyword}`;
      }

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

  const getBookmarkedRecipes = async () => {
    try {
      let response = await fetch(
        "http://localhost:8080/api/v1/recipes/bookmark",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const {
          data: { bookmarks },
        } = await response.json();
        setUsersBookmarked(bookmarks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const bookmarkRecipe = async (id) => {
    try {
      let response = await fetch(
        `http://localhost:8080/api/v1/recipes/bookmark/${id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/JSON",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const {
          data: { bookmarks },
        } = await response.json();
        setUsersBookmarked(bookmarks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      let response = await fetch(`http://localhost:8080/api/v1/recipes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/JSON",
        },
        credentials: "include",
      });

      if (response.ok) {
        setUsersRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== id)
        );
        let { msg } = await response.json();
        toast.success(msg);
        return { success: true, message: msg };
      } else {
        let { msg } = await response.json();
        if (msg) {
          toast.error(msg);
          return { success: false, message: msg };
        }
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "An error occurred" };
    }
  };

  useEffect(() => {
    getBookmarkedRecipes();
  }, []);
  return (
    <AppContext.Provider
      value={{
        getRecipes,
        deleteRecipe,
        recipeResults,
        isLoading,
        setIsLoading,
        usersRecipes,
        setUsersRecipes,
        bookmarkRecipe,
        usersBookmarked,
        setUsersBookmarked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
