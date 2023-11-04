import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useAppContext } from "../../context/appContext";
import { FaSearch } from "react-icons/fa";
import { RecipeArticle, Loading } from "../../components";

const SearchByName = () => {
  const navigate = useNavigate();
  const { getRecipes, recipeSearchResults, resultsLoaded, setResultsLoaded } =
    useAppContext();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("JUST SUBMITTED");
    setResultsLoaded(false);
    navigate("/results", {
      state: { keyword },
    });
  };

  useEffect(() => {
    console.log("running now");
    getRecipes();
  }, []);

  return (
    <div className="wrapper">
      <div className={styles.searchContainer}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <div className={styles.searchIcon}>
            <FaSearch />
          </div>
          <input
            className={styles.searchInput}
            placeholder="Search Recipes"
            onChange={(e) => setKeyword(e.target.value)}
          ></input>
        </form>
      </div>
      <p className={styles.text}>
        <span>LATEST RECIPES</span>
      </p>
      <div className={styles.recipesContainer}>
        {resultsLoaded &&
          recipeSearchResults.map((recipe, index) => {
            return <RecipeArticle key={recipe.id} recipe={recipe} />;
          })}
      </div>
    </div>
  );
};

export default SearchByName;
