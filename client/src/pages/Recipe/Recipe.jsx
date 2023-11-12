import { useEffect, useState } from "react";
import {
  EmptyPageContent,
  Loading,
  NutritionTable,
  SmallLoader,
} from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { FaRegClock } from "react-icons/fa";
import { BsBackspace, BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { CiExport } from "react-icons/ci";
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
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const isBookmarked = usersBookmarked?.some(
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

  // Function to cross off ingredients from list
  const toggleIngredient = (ingredient) => {
    setCheckedIngredients((prevSelected) => ({
      ...prevSelected,
      [ingredient]: !prevSelected[ingredient],
    }));
  };

  // Function to open the print window
  const handlePrint = () => {
    window.print();
  };

  // Function to retrieve recipe's nutritional information
  const getRecipeNutrition = async (recipeId) => {
    let url = `/api/v1/recipes/${id}/nutrition`;

    try {
      const response = await axios.get(url);

      if (response.data) {
        const {
          data: { recipeNutrition },
        } = response.data;
        console.log(recipeNutrition);
        setRecipeNutrition(recipeNutrition);
        setShowNutrition(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(recipeNutrition);
  // When page renders, fetch recipe data and nutrition info
  useEffect(() => {
    getRecipe();
    getRecipeNutrition(id);
    setShowLogin(false);
  }, []);

  // If loading display loading, else check if recipe is found and display not found page or recipe info
  return isLoading ? (
    <Loading />
  ) : recipeNotFound ? (
    <div className={clsx("wrapper")}>
      <h2 className={styles.title}>Recipe Not Found</h2>
      <EmptyPageContent page="noRecipe" />
    </div>
  ) : (
    <div className={styles.recipeWrapper}>
      {recipeInfo.id && (
        <div>
          <div className={styles.btnContainer}>
            <button onClick={() => navigate(-1)} className={styles.actionBtn}>
              <BsBackspace />
            </button>
            <div className={styles.secondaryBtnContainer}>
              <button className={styles.actionBtn} onClick={handlePrint}>
                <CiExport />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleBookmarkClick(id);
                }}
                className={styles.actionBtn}
              >
                {isBookmarked ? (
                  <BsBookmarkFill className="bookmarkFilled" />
                ) : (
                  <BsBookmark />
                )}
              </button>
            </div>
          </div>
          <div className={styles.recipeHeader}>
            <h3 className={styles.recipeTitle}>{recipeInfo.title}</h3>
          </div>

          <div className={clsx(styles.imgContainer, "imgContainer")}>
            <img
              className={styles.img}
              src={recipeInfo.image_url}
              alt={recipeInfo.title}
            />
          </div>
          <div className={styles.recipeInfoContainer}>
            <div className={styles.prepTimeContainer}>
              <span className={styles.prepTimeText}>Prep Time</span>
              <span className={styles.prepTime}>
                <FaRegClock />
                {recipeInfo.prep_time} min
              </span>
            </div>
            <div className={styles.ingInstrContainer}>
              <div className={styles.ingContainer}>
                <h4 className={styles.subHeader}>Ingredients</h4>
                <ul className={styles.ingContainer}>
                  {recipeInfo?.ingredients?.map((ing) => {
                    return (
                      <li
                        key={ing}
                        className={`${styles.ing} ${
                          checkedIngredients[ing] ? styles.crossed : ""
                        }`}
                      >
                        <label className={styles.checkboxContainer}>
                          <input
                            type="checkbox"
                            checked={checkedIngredients[ing] || false}
                            onChange={() => toggleIngredient(ing)}
                            className={styles.checkbox}
                          />
                          <span
                            className={`${styles.customCheckbox} ${
                              checkedIngredients[ing] ? styles.checked : ""
                            }`}
                          ></span>
                          {ing[0].toUpperCase() + ing.slice(1)}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={styles.instructionsContainer}>
                <h4 className={styles.subHeader}>Instructions</h4>
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
            <h4 className={clsx(styles.nutritionText, styles.subHeader)}>
              Estimated Nutrition Information
            </h4>
            {showNutrition ? (
              <NutritionTable recipeNutrition={recipeNutrition} />
            ) : (
              <SmallLoader />
            )}
          </div>
        </div>
      )}
      <LoginModal />
    </div>
  );
};

export default Recipe;
