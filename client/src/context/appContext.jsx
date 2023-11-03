import { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [recipeResults, setRecipeResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usersRecipes, setUsersRecipes] = useState([]);
  const [usersBookmarked, setUsersBookmarked] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const getCurrentUser = async () => {
    try {
      let response = await fetch("http://localhost:8080/api/v1/users/current", {
        credentials: "include",
      });

      if (response.ok) {
        const {
          data: { user },
        } = await response.json();
        setCurrentUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to logout User
  const logOutUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
        credentials: "include",
      });

      // If logout is successful, navigate to landing page and display toast message
      if (response.ok) {
        setCurrentUser([]);
        setUsersRecipes([]);
        setUsersBookmarked([]);
        setIsAuthenticated(false);
        const { msg } = await response.json();
        toast.success(msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to get recipes based on keyword or provided ingredients
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

  // Function to fetch current users' bookmarked recipes
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
    } finally {
      setIsLoading(false);
    }
  };

  // Function to check if bookmark is authenticated to bookmark recipe or show login mofal
  const handleBookmarkClick = (id) => {
    if (isAuthenticated) {
      bookmarkRecipe(id);
    } else {
      setShowLogin(true);
    }
  };

  // Function to add a recipe or remove a recipe from a user's bookmarks
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

  // Function do delete recipe
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
      toast.error("An unexpected error occurred");
      return { success: false, message: "An error occurred" };
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getBookmarkedRecipes();
    }
  }, [isAuthenticated]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
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
        getBookmarkedRecipes,
        getCurrentUser,
        currentUser,
        logOutUser,
        showLogin,
        setShowLogin,
        handleBookmarkClick,
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
