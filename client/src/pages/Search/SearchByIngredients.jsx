import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AutocompleteList, SelectedIngredientsList } from "../../components";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useAppContext } from "../../context/appContext";
import { FaSearch } from "react-icons/fa";
import axios from "../../utils/axiosConfig";

const SearchByIngredients = () => {
  const navigate = useNavigate();
  // Destructure functions and states from app context
  const { getRecipes, recipeSearchResults, setIsLoading } = useAppContext();
  // State to manage the list of selected ingredients
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  // State to manage user's input of ingredients
  const [input, setInput] = useState("");
  // State to manage suggested ingredients for autocomplete form
  const [suggestedList, setSuggestedList] = useState([]);
  // State for tracking the selected autocomplete item
  const [selectedAutocomplete, setSelectedAutocomplete] = useState(-1);

  // Function to handle user key press
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" && selectedAutocomplete > 0) {
      // Move key press up
      setSelectedAutocomplete((prev) => prev - 1);
    }
    if (
      e.key === "ArrowDown" &&
      selectedAutocomplete < suggestedList.length - 1
    ) {
      // Move key press down
      setSelectedAutocomplete((prev) => prev + 1);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedAutocomplete !== -1) {
        // If autocomplete tab is selected, add the selected autocomplete
        handleAdd(suggestedList[selectedAutocomplete]);
      } else if (input.trim() !== "") {
        // If autocomplete tab is not selected and input is not empty, add the input value
        handleAdd(input);
      }
    }
  };

  // Function to add inng to selectedIngreients and reset input and suggestions
  const handleAdd = (ing) => {
    if (!selectedIngredients.includes(ing.toLowerCase())) {
      setSelectedIngredients((prevIng) => [...prevIng, ing.toLowerCase()]);
    }
    // Reset states
    setInput("");
    setSuggestedList([]);
    setSelectedAutocomplete(-1);
  };

  // Function to handle button click and search recipes
  const searchRecipes = (e) => {
    e.preventDefault();
    navigate("/results", {
      state: { ingredients: selectedIngredients },
    });
  };

  // Function to fetch autocomplete suggestions
  const getAutoCompletedIngredients = async (input) => {
    try {
      let response = await axios.get(
        `/api/v1/ingredients/autocomplete?input=${input}`
      );
      const {
        data: { ingredientsList },
      } = response.data;
      setSuggestedList(ingredientsList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Clear the suggestions when the input is empty
    if (input.trim() === "") {
      setSuggestedList([]);
      return;
    }
    getAutoCompletedIngredients(input);
  }, [input]);

  return (
    <div className={clsx("wrapper")}>
      <div className={styles.searchContainer}>
        <h2>What Ingredients Do You Have?</h2>
        <form className={styles.searchForm}>
          <div className={styles.searchInputContainer}>
            <div className={styles.searchIcon}>
              <FaSearch />
            </div>
            <input
              name="ingredients"
              id="ingredients"
              className={styles.searchInput}
              placeholder="Search Ingredients"
              autoComplete="off"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              value={input}
            ></input>
          </div>
          <AutocompleteList
            suggestedList={suggestedList}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
            selectedAutocomplete={selectedAutocomplete}
            handleAdd={handleAdd}
            handleKeyDown={handleKeyDown}
          />
        </form>
      </div>
      <p className={styles.text}>
        <span>Ingredient List</span>
      </p>

      <div className={styles.wrapperSuggested}>
        <SelectedIngredientsList
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
      </div>
      <div className="btnContainer">
        <button className="btn" onClick={searchRecipes}>
          Search For Recipes
        </button>
      </div>
    </div>
  );
};

export default SearchByIngredients;
