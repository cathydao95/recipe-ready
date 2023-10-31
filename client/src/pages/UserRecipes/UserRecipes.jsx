import { useEffect, useState } from "react";
import { Loading, ResultsLayout } from "../../components";
import { useAppContext } from "../../context/appContext";
import { useLocation } from "react-router-dom";

const UserRecipes = () => {
  const { isLoading, setIsLoading, usersRecipes, setUsersRecipes } =
    useAppContext();

  const getPersonalRecipes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/recipes/userRecipes",
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const {
          data: { recipes },
        } = await response.json();
        setUsersRecipes(recipes);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getPersonalRecipes();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <ResultsLayout recipes={usersRecipes} title="My Recipes" page="personal" />
  );
};

export default UserRecipes;
