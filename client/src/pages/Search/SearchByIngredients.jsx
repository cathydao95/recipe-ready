import { useState } from "react";
import { IngredientList } from "../../components";
import clsx from "clsx";

const SearchByIngredients = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const searchRecipesByIng = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/recipes?ingredients=${selectedIngredients.join(
          ","
        )}`,
        { credentials: "include" }
      );
      if (response.ok) {
        const {
          data: { recipes },
        } = await response.json();
        console.log(recipes);
        setSearchResults(recipes);
      }
    } catch (error) {
      console.error(error);
    }
  };
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
          <button onClick={searchRecipesByIng}>Search For Recipes</button>
        </form>
      </div>
    </div>
  );
};

export default SearchByIngredients;
