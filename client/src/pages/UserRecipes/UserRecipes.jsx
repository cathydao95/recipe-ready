import { useEffect, useState } from "react";
import { ResultsLayout, SmallLoader } from "../../components";
import { useAppContext } from "../../context/appContext";

const UserRecipes = () => {
  const { usersRecipes, getPersonalRecipes, resultsLoaded } = useAppContext();

  useEffect(() => {
    getPersonalRecipes();
  }, []);

  return !resultsLoaded ? (
    <SmallLoader />
  ) : (
    <ResultsLayout recipes={usersRecipes} title="My Recipes" page="personal" />
  );
};

export default UserRecipes;
