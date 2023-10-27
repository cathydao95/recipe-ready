import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useAppContext } from "../../context/appContext";
import { FaSearch } from "react-icons/fa";
import { RecipeArticle } from "../../components";

const SearchByName = () => {
  const navigate = useNavigate();
  const { getRecipes, recipeResults, setIsLoading } = useAppContext();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/results", {
      state: { keyword },
    });
    setIsLoading(true);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <div className={styles.searchContainer}>
        <h2>Find a Recipe</h2>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <div className={styles.searchIcon}>
            <FaSearch />
          </div>
          <input
            className={styles.searchInput}
            onChange={(e) => setKeyword(e.target.value)}
          ></input>
        </form>
      </div>
      <div>
        {recipeResults.slice(5).map((recipe, index) => {
          return <RecipeArticle key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

export default SearchByName;
