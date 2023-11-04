import styles from "./styles.module.scss";
import clsx from "clsx";
import RecipeCard from "../RecipeCard/RecipeCard";
import Loading from "../Loading/Loading";
import EmptyPageContent from "../EmptyPageContent/EmptyPageContent";

const ResultsLayout = ({ recipes, title, page, isLoading }) => {
  return (
    // <div className={clsx("wrapper")}>
    //   <h2 className={styles.title}>{title}</h2>
    //   {isLoading ? (
    //     <Loading />
    //   ) : recipes.length === 0 ? (
    //     <EmptyPageContent page={page} />
    //   ) : (
    //     <div className={styles.recipesContainer}>
    //       {recipes.map((recipe) => (
    //         <RecipeCard key={recipe.id} recipe={recipe} />
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div className={clsx("wrapper")}>
      <h2 className={styles.title}>{title}</h2>

      {recipes.length === 0 ? (
        <EmptyPageContent page={page} />
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
