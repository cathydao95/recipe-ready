import { useEffect, useState } from "react";
import { Loading, ResultsLayout } from "../../components";
import { useAppContext } from "../../context/appContext";
import { useLocation } from "react-router-dom";

const Bookmarked = () => {
  const { isLoading, setIsLoading, usersBookmarked } = useAppContext();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <ResultsLayout
      recipes={usersBookmarked}
      title="Bookmarked Recipes"
      page="bookmarked"
    />
  );
};

export default Bookmarked;
