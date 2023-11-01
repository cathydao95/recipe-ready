import { useEffect, useState } from "react";
import { Loading, ResultsLayout } from "../../components";
import { useAppContext } from "../../context/appContext";
import { useLocation } from "react-router-dom";

const Bookmarked = () => {
  const { isLoading, usersBookmarked } = useAppContext();

  return (
    <ResultsLayout
      recipes={usersBookmarked}
      title="Bookmarked Recipes"
      page="bookmarked"
      isLoading={isLoading}
    />
  );
};

export default Bookmarked;
