import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormRow, Loading } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";
import uploadImg from "../../assets/upload-img.svg";

const Create = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
      setRecipeInfo({
        title: currentRecipeInfo.title,
        ingredients: currentRecipeInfo.ingredients,
        instructions: currentRecipeInfo.instructions,
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
      const response = await fetch(
        "http://localhost:8080/api/v1/recipes/upload",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const data = await response.json();
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
    let url;
    let method;
    if (isEditing) {
      url = `http://localhost:8080/api/v1/recipes/${currentRecipeInfo.id}`;
      method = "PUT";
    } else {
      url = "http://localhost:8080/api/v1/recipes";
      method = "POST";
    }
    try {
      let response = await fetch(url, {
        method,
        headers: {
          "Content-type": "application/JSON",
        },
        credentials: "include",
        body: JSON.stringify(recipeInfo),
      });

      if (response.ok) {
        let { msg } = await response.json();
        toast.success(msg);
        navigate("my-recipes");
      } else {
        let { msg } = await response.json();
        if (msg) {
          toast.error(msg);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="pageWrapper">
      <h1 className="title">
        {/* {currentRecipeInfo ? "Edit Recipe" : "Create New Recipe"} */}
        {isEditing && currentRecipeInfo ? "Edit Recipe" : "Create New Recipe"}
      </h1>
      <form className="form">
        <FormRow
          type="text"
          name="title"
          value={recipeInfo.title}
          handleInput={handleInput}
        />

        <div className={styles.imgInputContainer}>
          <img
            className={styles.uploadImg}
            src={recipeInfo.image_url !== "" ? recipeInfo.image_url : uploadImg}
          />
        </div>

        <div className="formRow">
          <input
            className="formInput"
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
        />
        <FormRow
          type="text"
          name="instructions"
          value={recipeInfo.instructions}
          handleInput={handleInput}
        />
        <FormRow
          type="number"
          name="prep_time"
          labelText="prep time (in minutes)"
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
  );
};

export default Create;
