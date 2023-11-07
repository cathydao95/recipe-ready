import { useEffect, useState } from "react";
import { ResultsLayout } from "../../components";
import { useAppContext } from "../../context/appContext";

const UserRecipes = () => {
  const { usersRecipes, getPersonalRecipes } = useAppContext();

  useEffect(() => {
    getPersonalRecipes();
  }, []);

  return (
    <ResultsLayout recipes={usersRecipes} title="My Recipes" page="personal" />
  );
};

export default UserRecipes;
