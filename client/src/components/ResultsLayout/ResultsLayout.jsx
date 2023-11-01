import { useEffect } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import RecipeCard from "../RecipeCard/RecipeCard";
import { BsBookmarkPlus } from "react-icons/bs";
import cooking from "../../assets/cooking.svg";
import Loading from "../Loading/Loading";

const ResultsLayout = ({ recipes, title, page, isLoading }) => {
  const EmptyPageContent = () => {
    switch (page) {
      case "personal":
        return (
          <div className={styles.noRecipesContainer}>
            <p>You Have Not Created Any Recipes</p>
            <div className={styles.imgContainer}>
              <img className={styles.img} src={cooking} alt="Cooking" />
            </div>
          </div>
        );
      case "searchResults":
        return <div>No Recipes Found</div>;
      case "bookmarked":
        return (
          <div>
            <div>
              <BsBookmarkPlus />
            </div>
            You Have not bookmarked any recipes
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
