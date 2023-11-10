import styles from "./styles.module.scss";
import clsx from "clsx";
import RecipeCard from "../RecipeCard/RecipeCard";
import EmptyPageContent from "../EmptyPageContent/EmptyPageContent";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";
import { BsBackspace } from "react-icons/bs";

const ResultsLayout = ({ recipes, title, page }) => {
  const { resultsLoaded } = useAppContext();
  const navigate = useNavigate();
  return (
    resultsLoaded && (
      <div className={clsx("wrapper")}>
        <div className={styles.headerContainer}>
          {recipes && recipes.length > 0 && (
            <button
              onClick={() => {
                navigate(-1);
              }}
              className={styles.backBtn}
            >
              <BsBackspace />
            </button>
          )}
          <h1 className={styles.title}>{title}</h1>
          {/* Create an invisible spacer element so that title can be centered and back button can be at the start */}
          <div className={styles.spacer}></div>
        </div>
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
