import { useEffect } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import RecipeCard from "../RecipeCard/RecipeCard";
import { BsBookmarkPlus } from "react-icons/bs";
import cooking from "../../assets/cooking.svg";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

const ResultsLayout = ({ recipes, title, page, isLoading }) => {
  // EmptyPageContent renders when there are no recipes to show
  const EmptyPageContent = () => {
    switch (page) {
      case "personal":
        // Content to display when no recipes and on personal recipes page
        return (
          <div className={styles.container}>
            <div>
              <p>You Have Not Created Any Recipes</p>
              <Link to="/create">
                <button className={styles.btn}>Create a Recipe</button>
              </Link>
            </div>

            <div className={styles.imgContainer}>
              <img className={styles.img} src={cooking} alt="Cooking" />
            </div>
          </div>
        );
      case "searchResults":
        // Content to display when no recipes and on recipe results page
        return (
          <div className={styles.container}>
            <p>No Recipes Found</p>
            <Link to="search-ingredients">
              <button className={styles.btn}> Search For Recipes</button>
            </Link>
            {/* <div className={styles.imgContainer}>
              <img className={styles.img} src={cooking} alt="Cooking" />
            </div> */}
          </div>
        );
      case "bookmarked":
        // Content to display when no recipes and on bookmarked recipes page
        return (
          <div className={clsx("wrapper", styles.container)}>
            <div className={styles.bookmarkIcon}>
              <BsBookmarkPlus />
            </div>
            <p>You Have Not Bookmarked Any Recipes</p>

            <Link to="search-ingredients">
              <button className={styles.btn}> Search For Recipes</button>
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={clsx("wrapper")}>
      <h1>{title}</h1>
      {isLoading ? (
        <Loading />
      ) : recipes.length === 0 ? (
        <EmptyPageContent />
      ) : (
        <div className={styles.recipesContainer}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsLayout;
