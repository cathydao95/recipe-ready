import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IngredientList } from "../../components";
import clsx from "clsx";
import { useAppContext } from "../../context/appContext";

const SearchByIngredients = () => {
  const navigate = useNavigate();
  // Destructure functions and states from app context
  const { getRecipes, recipeResults, setIsLoading } = useAppContext();
  // State to manage the list of selected ingredients
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/results", {
      state: { ingredients: selectedIngredients },
    });
  };

  return (
    <div className={clsx("wrapper")}>
      <h2>What Ingredients Do You Have?</h2>

      <form>
        <IngredientList
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
        <button className="formBtn" onClick={(e) => handleSubmit(e)}>
          Search For Recipes
        </button>
      </form>
    </div>
  );
};

export default SearchByIngredients;
