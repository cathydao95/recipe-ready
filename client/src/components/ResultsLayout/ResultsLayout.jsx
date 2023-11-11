import styles from "./styles.module.scss";
import clsx from "clsx";
import RecipeCard from "../RecipeCard/RecipeCard";
import EmptyPageContent from "../EmptyPageContent/EmptyPageContent";
import { useNavigate } from "react-router-dom";
import { BsBackspace } from "react-icons/bs";

// Create layout for bookmarked, results, and personal page
const ResultsLayout = ({ recipes, title, page }) => {
  const navigate = useNavigate();

  // Variable that determimes if back button should be shown
  const showBackButton = recipes && recipes.length > 0;

  return (
    <div className={clsx("wrapper")}>
      <div className={styles.headerContainer}>
        {/* Check if backButton should be displayed */}
        {showBackButton ? (
          <div
            onClick={() => {
              navigate(-1);
            }}
            className={styles.backBtn}
          >
            <BsBackspace />
          </div>
        ) : (
          // Invisible spacer when back button is not present
          <div className={styles.spacer}></div>
        )}
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.spacer}></div>
      </div>
      {recipes?.length === 0 ? (
        <EmptyPageContent page={page} />
      ) : (
        <div className={styles.recipesContainer}>
          {recipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} page={page} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsLayout;
