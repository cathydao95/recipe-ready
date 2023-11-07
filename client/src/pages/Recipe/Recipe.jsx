import { useEffect, useState } from "react";
import { EmptyPageContent, Loading } from "../../components";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { FaRegClock, FaBookmark, FaCheck } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import LoginModal from "../../components/LoginModal/LoginModal";
import axios from "../../utils/axiosConfig";

const Recipe = () => {
  const { isLoading, usersBookmarked, handleBookmarkClick, setShowLogin } =
    useAppContext();
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
      const response = await axios.get(`/api/v1/recipes/${id}`);
      if (response.status === 404) {
        setRecipeNotFound(true);
      }

      if (response.status === 200) {
        const {
          data: { recipe },
        } = response.data;

        setRecipeInfo(recipe[0]);
      }
    } catch (error) {
      console.error(error);
      setRecipeNotFound(true);
    }
  };

  // Function to retrieve recipe's nutritional information
  const getRecipeNutrition = async (recipeId) => {
    let url = `/api/v1/recipes/${id}/nutrition`;

    try {
      const response = await axios.get(url);
      console.log(response);

      if (response.data) {
        const {
          data: { recipeNutrition },
        } = response.data;
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
    <div className={clsx("wrapper")}>
      <h2 className={styles.title}>Recipe Not Found</h2>
      <EmptyPageContent page="noRecipe" />
    </div>
  ) : (
    <div>
      {recipeInfo.id && (
        <div className={clsx(styles.recipeWrapper, "wrapper")}>
          <div className={styles.btnContainer}>
            <button onClick={() => navigate(-1)} className={styles.actionBtn}>
              Back
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleBookmarkClick(id);
              }}
              className={styles.actionBtn}
            >
              {isBookmarked ? (
                <>
                  <span className={styles.bookmarkContainer}>
                    Bookmarked <FaCheck />
                  </span>
                </>
              ) : (
                <>
                  <span className={styles.bookmarkContainer}>
                    <FaBookmark /> Bookmark
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
              <h3 className={styles.recipeTitle}>{recipeInfo.title}</h3>
              <span className={styles.prepTime}>
                <FaRegClock />
                {recipeInfo.prep_time} min
              </span>
            </div>
            <div className={styles.ingInstrContainer}>
              <div className={styles.ingContainer}>
                <h4>Ingredients</h4>
                <ul className={styles.ingContainer}>
                  {recipeInfo?.ingredients?.map((ing) => {
                    return (
                      <li key={ing} className={styles.ing}>
                        {ing[0].toUpperCase() + ing.slice(1)}
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
            </div>
            <div className={styles.nutrBtnContainer}>
              <button
                className="btn"
                onClick={() => getRecipeNutrition(recipeInfo.id)}
              >
                See Nutrition Info
              </button>
            </div>
            {showNutrition && (
              <div className={styles.nutritionContainer}>
                <table className={styles.nutritionTable}>
                  <thead>
                    <tr>
                      <th>Nutrition</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Calories</td>
                      <td>
                        {recipeNutrition.calories?.value}{" "}
                        {recipeNutrition.calories?.unit}
                      </td>
                    </tr>
                    <tr>
                      <td>Carbs</td>
                      <td>
                        {recipeNutrition.carbs?.value}{" "}
                        {recipeNutrition.carbs?.unit}
                      </td>
                    </tr>
                    <tr>
                      <td>Protein</td>
                      <td>
                        {recipeNutrition.protein?.value}{" "}
                        {recipeNutrition.protein?.unit}
                      </td>
                    </tr>
                    <tr>
                      <td>Fat</td>
                      <td>
                        {recipeNutrition.fat?.value} {recipeNutrition.fat?.unit}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
