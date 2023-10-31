import { useEffect, useState } from "react";
import { Loading } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { FaRegClock, FaRegBookmark, FaRegTrashAlt } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";

const Recipe = () => {
  const { setIsLoading, isLoading, deleteRecipe } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipeNutrition, setRecipeNutrition] = useState();
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [showNutrition, setShowNutrition] = useState(false);
  const [recipeNotFound, setRecipeNotFound] = useState(false);

  // Get information for recipe using id
  const getRecipe = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/recipes/${id}`,
        {
          credentials: "include",
        }
      );
      if (response.status === 404) {
        setRecipeNotFound(true);
        setIsLoading(false);
      }

      if (response.ok) {
        const {
          data: { recipe },
        } = await response.json();

        setRecipeInfo(recipe[0]);

        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // When delete button is clicked, call deleteRecipe function and navigate to new screen
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const { success } = await deleteRecipe(id);
    if (success) {
      navigate("/dashboard/my-recipes");
    }
  };

  // Get the nutrition for the recipe
  const getRecipeNutrition = async (recipeId) => {
    let url = `http://localhost:8080/api/v1/recipes/${id}/nutrition`;
    console.log(url);
    try {
      const response = await fetch(url, {
        credentials: "include",
      });

      if (response.ok) {
        const {
          data: { recipeNutrition },
        } = await response.json();
        setRecipeNutrition(recipeNutrition);
        setShowNutrition(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Run get recipe function when page renders
  useEffect(() => {
    getRecipe();
  }, []);

  console.log(recipeInfo);
  return isLoading ? (
    <Loading />
  ) : recipeNotFound ? (
    <h1>Recipe Not Found</h1>
  ) : (
    recipeInfo.id && (
      <div className={clsx(styles.recipeWrapper, "wrapper")}>
        <div className={clsx(styles.imgContainer, "imgContainer")}>
          <img
            className={styles.img}
            src={recipeInfo.image_url}
            alt={recipeInfo.title}
          />
          {recipeInfo.user_id && recipeInfo.user_id !== null && (
            <div
              className="icon trashIcon"
              onClick={(e) => handleDelete(e, id)}
            >
              <FaRegTrashAlt />
            </div>
          )}
          <div className="icon bookmarkIcon">
            <FaRegBookmark />
          </div>
        </div>
        <div className={styles.recipeInfoContainer}>
          <div className={styles.recipeHeader}>
            <h3>{recipeInfo.title}</h3>
            <span className="prepTime">
              <FaRegClock />
              {recipeInfo.prep_time} min
            </span>
          </div>
          <div className={styles.ingContainer}>
            <h4>Ingredients</h4>
            <ul className={styles.ingContainer}>
              {recipeInfo?.ingredients?.map((ing) => {
                return (
                  <li key={ing} className={styles.ing}>
                    {ing}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.instructionsContainer}>
            <h4>Instructions</h4>
            <ol className={styles.instructionsList}>
              {recipeInfo.instructions
                // split by 1. , 2.,
                .split(/\d+\.\s+/)
                // remove empty string at index 0
                .slice(1)
                .map((instruction) => {
                  return (
                    <li key={instruction} className={styles.instruction}>
                      {instruction}
                    </li>
                  );
                })}
            </ol>
          </div>
          <button onClick={() => getRecipeNutrition(recipeInfo.id)}>
            See Nutrition Info
          </button>
          {showNutrition && (
            <div>
              <h6>
                Calories:
                <span>
                  {recipeNutrition.calories.value}
                  {recipeNutrition.calories.unit}
                </span>
              </h6>
              <h6>
                Carbs:
                <span>
                  {recipeNutrition.carbs.value}
                  {recipeNutrition.carbs.unit}
                </span>
              </h6>
              <h6>
                Protein:
                <span>
                  {recipeNutrition.protein.value}
                  {recipeNutrition.protein.unit}
                </span>
              </h6>
              <h6>
                Fat:
                <span>
                  {recipeNutrition.fat.value}
                  {recipeNutrition.fat.unit}
                </span>
              </h6>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Recipe;
