import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import { FormRow, Loading } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";
import clsx from "clsx";
import uploadImg from "../../assets/uploadimg.png";
import {
  formatStringInstructions,
  removeNumberingFromInstructions,
} from "../../utils/utils";
import { useAppContext } from "../../context/appContext";

const Create = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setResultsLoaded } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const { isEditing, currentRecipeInfo } = location.state || {};

  // Initial state for create recipe form
  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
    prep_time: "",
    image_url: "",
  };

  const [recipeInfo, setRecipeInfo] = useState(initialState);

  //When isEditing and currentRecipeInfo exists, set recipeInfo with info from  current recipe.
  useEffect(() => {
    if (isEditing && currentRecipeInfo) {
      const instructionsWithoutNumbering = removeNumberingFromInstructions(
        currentRecipeInfo.instructions
      );
      setRecipeInfo({
        title: currentRecipeInfo.title,
        // takes the ingredients array and joins each element by a comma and removes and trailing punctuation and white space
        ingredients: currentRecipeInfo.ingredients
          .join(", ")
          .replace(/[.,;!?]+\s*$/, ""),
        instructions: instructionsWithoutNumbering,
        prep_time: currentRecipeInfo.prep_time,
        image_url: currentRecipeInfo.image_url,
      });
    } else {
      setRecipeInfo(initialState);
    }
    setIsLoading(false);
  }, [isEditing, currentRecipeInfo]);

  // Function to handle image upload.
  const uploadRecipeImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(`/api/v1/recipes/upload`, formData);
      const data = response.data;
      if (data.secure_url) {
        setRecipeInfo((prevInfo) => ({
          ...prevInfo,
          image_url: data.secure_url,
        }));
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image");
    }
  };

  // Function to handle input changes.
  const handleInput = (e) => {
    if (e.target.name === "image_url") {
      uploadRecipeImage(e.target.files[0]);
    } else {
      setRecipeInfo((prevInput) => {
        return { ...prevInput, [e.target.name]: e.target.value };
      });
    }
  };

  // Function to create or edit recipe
  const createRecipe = async (e) => {
    e.preventDefault();

    // Use utils function to format recipe instructions into an ordered list.
    const formattedInstructions = formatStringInstructions(
      recipeInfo.instructions
    );

    const updatedRecipeInfo = {
      ...recipeInfo,
      instructions: formattedInstructions,
    };
    let url;
    // Check if editing or creating to determine if post or put request
    let axiosMethod = isEditing ? axios.put : axios.post;
    if (isEditing) {
      url = `/api/v1/recipes/${currentRecipeInfo.id}`;
    } else {
      url = `/api/v1/recipes`;
    }
    try {
      let response = await axiosMethod(url, updatedRecipeInfo);

      toast.success(
        isEditing
          ? "Recipe Successfully Updated"
          : "Recipe Successfully Created"
      );
      setResultsLoaded(false);
      setTimeout(() => {
        navigate("/my-recipes");
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className={styles.wrapper}>
      <h1 className="title">
        {isEditing && currentRecipeInfo ? "Edit Recipe" : "Create New Recipe"}
      </h1>
      <div className="formContainer">
        <form className="form">
          <FormRow
            type="text"
            name="title"
            value={recipeInfo.title}
            labelText="Recipe Title"
            handleInput={handleInput}
          />

          <div className={styles.imgInputContainer}>
            <img
              className={styles.uploadImg}
              src={
                recipeInfo.image_url !== "" ? recipeInfo.image_url : uploadImg
              }
              alt="individual taking picture of food with phone"
            />
          </div>

          <div className={clsx("formRow", styles.imgFormRow)}>
            {/* Added a label that will be hidden with CSS to make it available to screen readers to enhance accessibility */}
            <label htmlFor="imageUpload" className={styles.imgLabel}>
              Upload Image
            </label>
            <input
              className={styles.imgInput}
              id="imageUpload"
              type="file"
              name="image_url"
              accept="image/*"
              onChange={handleInput}
            />
          </div>

          <FormRow
            type="text"
            name="ingredients"
            value={recipeInfo.ingredients}
            handleInput={handleInput}
            labelText="Ingredients"
          />
          <FormRow
            type="text"
            name="instructions"
            value={recipeInfo.instructions}
            handleInput={handleInput}
            labelText="Instructions"
          />
          <FormRow
            type="number"
            name="prep_time"
            labelText="Prep Time (Minutes)"
            value={recipeInfo.prep_time}
            handleInput={handleInput}
          />

          <button
            className="formBtn"
            type="submit"
            onClick={createRecipe}
            disabled={recipeInfo.image_url === ""}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
