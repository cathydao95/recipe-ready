import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useAppContext } from "../../context/appContext";
import { FaSearch } from "react-icons/fa";
import { RecipeArticle, SmallLoader } from "../../components";
import InfiniteScroll from "react-infinite-scroll-component";
import { limitScreenSize, getMealTime } from "../../utils/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchByName = () => {
  const navigate = useNavigate();
  const {
    getRecipes,
    recipeSearchResults,
    hasMore,
    resultsLoaded,
    setResultsLoaded,
    resetSearch,
  } = useAppContext();
  const [keyword, setKeyword] = useState("");
  const [localPage, setLocalPage] = useState(1);
  const [mealTime, setMealTime] = useState(getMealTime());

  // Pass in limitScreenSize utils function and pass in window.innerWidth to find out size of screen
  const limit = limitScreenSize(window.innerWidth);

  // Function that passes keyword to results
  const handleSubmit = (e) => {
    // if search is empty return
    e.preventDefault();
    if (keyword.trim() === "") {
      toast.error("Please enter a search word");
      return;
    }
    resetSearch();
    setResultsLoaded(false);
    navigate("/results", {
      state: { keyword },
    });
  };

  // When page renders, get recipes witth default settings
  useEffect(() => {
    getRecipes([], "", limit, localPage);
  }, []);

  // Function t load more recipes when infinite scroll component reached end of window and hasMore is true
  const loadMoreRecipes = async () => {
    // Call getRecipes with the next page number without updating the state here
    setTimeout(() => {
      getRecipes([], "", limit, localPage + 1);
      setLocalPage((prev) => prev + 1);
    }, 700);
  };

  return (
    <div className="wrapper">
      <div className={styles.searchContainer}>
        <h1>Let's get Recipe Ready! </h1>
        <p>
          Kickstart your {mealTime}: Discover Delicious Ideas, Find Favorites,
          or {""}
          <Link to="search-ingredients" className={styles.linkText}>
            Explore Recipes by Ingredients!
          </Link>
        </p>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <div className={styles.searchInputContainer}>
            <div className={styles.searchIcon}>
              <FaSearch />
            </div>
            <input
              name="search"
              id="search"
              className={styles.searchInput}
              placeholder="Search Recipes"
              onChange={(e) => setKeyword(e.target.value)}
              autoComplete="off"
            ></input>
          </div>
        </form>
      </div>
      <p className={styles.text}>
        <span>LATEST RECIPES</span>
      </p>
      {!recipeSearchResults ? (
        <SmallLoader />
      ) : (
        recipeSearchResults && (
          <InfiniteScroll
            dataLength={recipeSearchResults.length}
            next={loadMoreRecipes}
            hasMore={hasMore}
            loader={<SmallLoader />}
          >
            <div className={styles.recipesContainer}>
              {resultsLoaded &&
                recipeSearchResults.map((recipe, index) => {
                  return <RecipeArticle key={index} recipe={recipe} />;
                })}
            </div>
          </InfiniteScroll>
        )
      )}
    </div>
  );
};

export default SearchByName;
