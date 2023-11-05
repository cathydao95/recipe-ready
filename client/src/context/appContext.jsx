import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

axios.defaults.withCredentials = true;

// Create variable for env
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [usersRecipes, setUsersRecipes] = useState([]);
  const [usersBookmarked, setUsersBookmarked] = useState([]);
  const [recipeSearchResults, setRecipeSearchResults] = useState([]);
  const [resultsLoaded, setResultsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      let response = await axios.get(`${API_BASE_URL}/api/v1/users/current`);
      const {
        data: { user },
      } = response.data;
      setCurrentUser(user);
      setIsAuthenticated(true);
      getBookmarkedRecipes();
      getPersonalRecipes();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to logout User
  const logOutUser = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/auth/logout`);
      setCurrentUser([]);
      setUsersRecipes([]);
      setUsersBookmarked([]);
      setIsAuthenticated(false);
      const { msg } = response.data;
      toast.success(msg);
    } catch (error) {
      console.error(error);
      toast.error("Logout Failed");
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

      const response = await axios.get(
        `${API_BASE_URL}/api/v1/recipes${queryParam}`
      );

      const {
        data: { recipes },
      } = await response.data;
      setRecipeSearchResults(recipes);
      setResultsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch a user's personal/created recipes
  const getPersonalRecipes = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/recipes/userRecipes`
      );
      // If successful, set usersRecipes state to response

      const {
        data: { recipes },
      } = await response.data;
      setUsersRecipes(recipes);
      setResultsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch current users' bookmarked recipes
  const getBookmarkedRecipes = async () => {
    try {
      let response = await axios.get(
        `${API.VITE_BASE_URL}/api/v1/recipes/bookmark`
      );

      const {
        data: { bookmarks },
      } = await response.data;
      setUsersBookmarked(bookmarks);
      setResultsLoaded(true);
    } catch (error) {
      console.error(error);
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
      let response = await axios.post(
        `${API_BASE_URL}/api/v1/recipes/bookmark/${id}`
      );

      const {
        data: { bookmarks },
      } = await response.data;
      setUsersBookmarked(bookmarks);
    } catch (error) {
      console.error(error);
    }
  };

  // Function do delete recipe
  const deleteRecipe = async (id) => {
    try {
      let response = await axios.delete(`${API_BASE_URL}/api/v1/recipes/${id}`);

      setUsersRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );

      let { msg } = await response.data;
      toast.success("Recipe Deleted!");
      return { success: true, message: msg };
    } catch (error) {
      toast.error("Error deleting recipe");
      return { success: false, message: "An error occurred" };
    }
  };

  console.log("testing if loading", isLoading);
  console.log("testing if results loaded", resultsLoaded);
  console.log("testing for current user", currentUser);
  console.log("recipe results", recipeSearchResults);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        getRecipes,
        deleteRecipe,
        recipeSearchResults,
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
        resultsLoaded,
        setResultsLoaded,
        getPersonalRecipes,
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
