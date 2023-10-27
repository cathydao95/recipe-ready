import styles from "./styles.module.scss";
import clsx from "clsx";
import RecipeCard from "../RecipeCard/RecipeCard";

const ResultsLayout = ({ recipes, title }) => {
  return (
    <div className={clsx("wrapper")}>
      <h1>{title}</h1>
      <div className={styles.recipesContainer}>
        {recipes.map((recipe, index) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

export default ResultsLayout;
