import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IngredientList } from "../../components";
import clsx from "clsx";
import { useAppContext } from "../../context/appContext";

const SearchByIngredients = () => {
  const navigate = useNavigate();
  const { getRecipes, recipeResults, setIsLoading } = useAppContext();
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/results", {
      state: { ingredients: selectedIngredients },
    });
    setIsLoading(true);
  };

  console.log(recipeResults);

  return (
    <div className={clsx("wrapper")}>
      <h2>What Ingredients Do You Have?</h2>
      <div>
        <h4>Ingredients</h4>

        <form>
          <IngredientList
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />
          <button onClick={(e) => handleSubmit(e)}>Search For Recipes</button>
        </form>
      </div>
    </div>
  );
};

export default SearchByIngredients;
