import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormRow } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const navigate = useNavigate();
  const [recipeInfo, setRecipeInfo] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    prep_time: "",
    image_url: "",
  });

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
      console.log(data);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image");
    }
  };

  const handleInput = (e) => {
    if (e.target.name === "image_url") {
      uploadRecipeImage(e.target.files[0]);
    } else {
      setRecipeInfo((prevInput) => {
        return { ...prevInput, [e.target.name]: e.target.value };
      });
    }
  };

  console.log(recipeInfo);

  const createRecipe = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:8080/api/v1/recipes", {
        method: "POST",
        headers: {
          "Content-type": "application/JSON",
        },
        credentials: "include",
        body: JSON.stringify(recipeInfo),
      });

      console.log(recipeInfo, "for body");
      if (response.ok) {
        let { msg } = await response.json();
        toast.success(msg);
        navigate("/dashboard/my-recipes");
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

  // console.log(recipeInfo);
  return (
    <div className="pageWrapper">
      <h1 className="title">Create New Recipe</h1>
      <form className="form">
        <FormRow type="text" name="title" handleInput={handleInput} />
        <FormRow type="text" name="ingredients" handleInput={handleInput} />
        <FormRow type="text" name="instructions" handleInput={handleInput} />
        <FormRow
          type="number"
          name="prep_time"
          labelText="prep time (in minutes)"
          handleInput={handleInput}
        />

        <div className="formRow">
          <input
            className="formInput"
            type="file"
            name="image_url"
            accept="image/*"
            onChange={handleInput}
          />
        </div>
        {recipeInfo.image_url && recipeInfo.image_url !== "" && (
          <div>
            <img src={recipeInfo.image_url} />
          </div>
        )}

        <button className="formBtn" type="submit" onClick={createRecipe}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
