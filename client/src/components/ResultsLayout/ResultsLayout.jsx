import styles from "./styles.module.scss";
import clsx from "clsx";
import RecipeCard from "../RecipeCard/RecipeCard";
import { BsBookmarkPlus } from "react-icons/bs";
import cooking from "../../assets/cooking.svg";

const ResultsLayout = ({ recipes, title, page }) => {
  console.log("testest", recipes);

  const displayRecipes = () => {
    return recipes.map((recipe, index) => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ));
  };

  const displayEmptyPage = () => {
    switch (page) {
      case "personal":
        return (
          <div className={styles.noRecipesContainer}>
            <p>You Have Not Created Any Recipes</p>
            <div className={styles.imgContainer}>
              <img className={styles.img} src={cooking} />
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
      {recipes.length === 0 ? displayEmptyPage() : displayRecipes()}
    </div>
  );
};

export default ResultsLayout;
