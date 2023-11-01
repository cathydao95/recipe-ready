import { useEffect, useState } from "react";
import { Loading, ResultsLayout } from "../../components";
import { useAppContext } from "../../context/appContext";

const UserRecipes = () => {
  const { usersRecipes, setUsersRecipes } = useAppContext();

  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch a user's personal/created recipes
  const getPersonalRecipes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/recipes/userRecipes",
        {
          credentials: "include",
        }
      );
      // If successful, set usersRecipes state to response
      if (response.ok) {
        const {
          data: { recipes },
        } = await response.json();
        setUsersRecipes(recipes);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPersonalRecipes();
  }, []);

  return (
    <ResultsLayout
      recipes={usersRecipes}
      title="My Recipes"
      page="personal"
      isLoading={isLoading}
    />
  );
};

export default UserRecipes;
