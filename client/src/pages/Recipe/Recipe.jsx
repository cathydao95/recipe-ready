import { useEffect, useState } from "react";
import { Loading } from "../../components";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { FaRegClock, FaBookmark } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import LoginModal from "../../components/LoginModal/LoginModal";

const Recipe = () => {
  const {
    setIsLoading,
    isLoading,
    deleteRecipe,
    usersBookmarked,
    handleBookmarkClick,
    setShowLogin,
  } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipeNutrition, setRecipeNutrition] = useState();
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [showNutrition, setShowNutrition] = useState(false);
  const [recipeNotFound, setRecipeNotFound] = useState(false);

  const isBookmarked = usersBookmarked.some(
    (bookmarkedRecipe) => bookmarkedRecipe.id == id
  );

  // Function to get recipe information using id
  const getRecipe = async () => {
    try {
      const response = await fetch(
        `import.meta.env.VITE_API_URL/api/v1/recipes/${id}`,
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

  // Function to handle recipe deletion
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const { success } = await deleteRecipe(id);
    // If recipe successfully deleted, navigate to user's personal recipes page
    if (success) {
      navigate("/my-recipes");
    }
  };

  // Function to retrieve recipe's nutritional information
  const getRecipeNutrition = async (recipeId) => {
    let url = `import.meta.env.VITE_API_URL/api/v1/recipes/${id}/nutrition`;

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
    setShowLogin(false);
  }, []);

  return isLoading ? (
    <Loading />
  ) : recipeNotFound ? (
    <div>
      <button onClick={() => navigate(-1)}>Back to Search</button>
      <h1>Recipe Not Found</h1>
    </div>
  ) : (
    <div>
      {recipeInfo.id && (
        <div className={clsx(styles.recipeWrapper, "wrapper")}>
          <div className={styles.btnContainer}>
            <button onClick={() => navigate(-1)} className={styles.actionBtn}>
              Back To Search
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleBookmarkClick(id);
              }}
              className={styles.actionBtn}
            >
              {isBookmarked ? (
                "Bookmarked"
              ) : (
                <>
                  <span>
                    <FaBookmark />
                    Bookmark Recipe
                  </span>
                </>
              )}
            </button>
          </div>
          <div className={clsx(styles.imgContainer, "imgContainer")}>
            <img
              className={styles.img}
              src={recipeInfo.image_url}
              alt={recipeInfo.title}
            />
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
      )}
      <LoginModal />
    </div>
  );
};

export default Recipe;
