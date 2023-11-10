import { useState, createContext, useEffect, useContext } from "react";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [usersRecipes, setUsersRecipes] = useState(null);
  const [usersBookmarked, setUsersBookmarked] = useState(null);
  const [recipeSearchResults, setRecipeSearchResults] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resultsLoaded, setResultsLoaded] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Function to get current user and authenticate and get user's recipes and bookmarks
  const getCurrentUser = async () => {
    try {
      let response = await axios.get(`/api/v1/users/current`);
      const {
        data: { user },
      } = response.data;
      setCurrentUser(user);
      setIsAuthenticated(true);
      getBookmarkedRecipes();
      getPersonalRecipes();
    } catch (error) {
      const {
        data: { msg },
      } = error.response;
      console.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to logout User
  const logOutUser = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/logout`);
      setCurrentUser([]);
      setUsersRecipes([]);
      setUsersBookmarked([]);
      setIsAuthenticated(false);
      const { msg } = response.data;
      toast.success(msg);
    } catch (error) {
      console.error(error.response);
      toast.error("Logout Failed");
    }
  };

  // Function to get recipes based on keyword or provided ingredients
  const getRecipes = async (
    ingredients = [],
    keyword = "",
    limit,
    pageNumber
  ) => {
    try {
      let queryParam = `?limit=${limit}&page=${pageNumber}`;

      if (ingredients && ingredients.length > 0) {
        queryParam += `&ingredients=${ingredients.join(",")}`;
      }

      if (keyword && keyword !== "") {
        queryParam += `&keyword=${keyword}`;
      }

      const response = await axios.get(`/api/v1/recipes${queryParam}`);

      const {
        data: { recipes },
        hasMore: updatedHasMore,
      } = response.data;

      // If page number greater than 1, append new recipe results
      if (pageNumber === 1) {
        setRecipeSearchResults(recipes);
      } else {
        setRecipeSearchResults((prevRecipes) => [...prevRecipes, ...recipes]);
      }
      // updated hasmore to the newest has more
      if (updatedHasMore) {
        setHasMore(updatedHasMore);
      } else {
        setHasMore(false);
      }
      setResultsLoaded(true);
    } catch (error) {
      console.error(error.response);
    }
  };

  // Reset search defaults
  const resetSearch = () => {
    setRecipeSearchResults([]);
    setHasMore(true);
  };

  // Function to fetch a user's personal/created recipes
  const getPersonalRecipes = async () => {
    try {
      const response = await axios.get(`/api/v1/recipes/userRecipes`);
      // If successful, set usersRecipes state to response

      const {
        data: { recipes },
      } = response.data;
      setUsersRecipes(recipes);
      setResultsLoaded(true);
    } catch (error) {
      console.error(error.response);
    }
  };

  // Function to fetch current users' bookmarked recipes
  const getBookmarkedRecipes = async () => {
    try {
      let response = await axios.get(`/api/v1/recipes/bookmark`);

      const {
        data: { bookmarks },
      } = response.data;
      setUsersBookmarked(bookmarks);
      setResultsLoaded(true);
    } catch (error) {
      console.error(error.response);
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
      let response = await axios.post(`/api/v1/recipes/bookmark/${id}`);

      const {
        data: { bookmarks },
      } = response.data;
      setUsersBookmarked(bookmarks);
    } catch (error) {
      console.error(error.response);
    }
  };

  // Function do delete recipe
  const deleteRecipe = async (id) => {
    try {
      let response = await axios.delete(`/api/v1/recipes/${id}`);

      setUsersRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
      setUsersBookmarked((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark.id !== id)
      );

      let { msg } = response.data;
      toast.success("Recipe Deleted!");
      return { success: true, message: msg };
    } catch (error) {
      toast.error("Error deleting recipe");
      return { success: false, message: "An error occurred" };
    }
  };

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
        hasMore,
        resetSearch,
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
