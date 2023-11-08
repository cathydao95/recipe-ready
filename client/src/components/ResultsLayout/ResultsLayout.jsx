import styles from "./styles.module.scss";
import clsx from "clsx";
import RecipeCard from "../RecipeCard/RecipeCard";
import EmptyPageContent from "../EmptyPageContent/EmptyPageContent";
import { useAppContext } from "../../context/appContext";

const ResultsLayout = ({ recipes, title, page }) => {
  const { resultsLoaded } = useAppContext();
  return (
    resultsLoaded && (
      <div className={clsx("wrapper")}>
        <h1 className={styles.title}>{title}</h1>
        {!recipes || recipes.length === 0 ? (
          <EmptyPageContent page={page} />
        ) : (
          <div className={styles.recipesContainer}>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} page={page} />
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default ResultsLayout;
