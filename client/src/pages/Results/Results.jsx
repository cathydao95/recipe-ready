import { useEffect, useState } from "react";
import { ResultsLayout } from "../../components";
import { useAppContext } from "../../context/appContext";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoader from "../../components/SmallLoader/SmallLoader";
import { limitScreenSize } from "../../utils/utils";

const Results = () => {
  const { getRecipes, hasMore, recipeSearchResults, resultsLoaded } =
    useAppContext();

  const [localPage, setLocalPage] = useState(1);
  const location = useLocation();
  const { state } = location;
  // If ingredients are passed, set selectedIngredients to ingredients, else set as empty array

  const selectedIngredients =
    state && state.ingredients ? state.ingredients : [];
  // If keyword is passed, set keyword to the word, else set to empty string
  const keyword = state && state.keyword ? state.keyword : "";

  // Function to calculate limit based on window size
  const limit = limitScreenSize(window.innerWidth);

  // Load recipes based on ing/keyword,limits, and page
  useEffect(() => {
    getRecipes(selectedIngredients, keyword, limit, localPage);
  }, []);

  const loadMoreRecipes = async () => {
    //  Set time out to make loader
    setTimeout(() => {
      getRecipes(selectedIngredients, keyword, limit, localPage + 1);
    }, 700);
    setLocalPage((prev) => prev + 1);
  };

  return !resultsLoaded ? (
    <SmallLoader />
  ) : (
    recipeSearchResults && (
      <InfiniteScroll
        dataLength={recipeSearchResults.length}
        next={loadMoreRecipes}
        hasMore={hasMore}
        loader={<SmallLoader />}
      >
        <ResultsLayout
          recipes={recipeSearchResults}
          title="Recipe Results"
          page="searchResults"
        />
      </InfiniteScroll>
    )
  );
};

export default Results;
