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

  const [input, setInput] = useState("");
  const [suggestedList, setSuggestedList] = useState([]);

  // function to handle user enter key press
  const handleEnterKey = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      handleAdd(input);
    }
  };

  console.log("testing input", input);

  // Function to add inng to selectedIngreients and reset input and suggestions
  const handleAdd = (ing) => {
    if (!selectedIngredients.includes(ing)) {
      setSelectedIngredients((prevIng) => [...prevIng, ing.toLowerCase()]);
    }

    setInput("");
    setSuggestedList([]);
  };

  console.log(selectedIngredients);

  // Function to handle button click and search recipes
  const searchRecipes = (e) => {
    e.preventDefault();
    navigate("/results", {
      state: { ingredients: selectedIngredients },
    });
  };

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
    if (input.trim() === "") {
      // Clear the suggestions when the input is empty
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
              onKeyDown={(e) => handleEnterKey(e)}
              value={input}
            ></input>
          </div>
          <AutocompleteList
            suggestedList={suggestedList}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
            handleAdd={handleAdd}
          />
        </form>
      </div>
      <p className={styles.text}>
        <span>Ingredients</span>
      </p>
      <form>
        <SelectedIngredientsList
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
        <button className="formBtn" onClick={searchRecipes}>
          Search For Recipes
        </button>
      </form>
    </div>
  );
};

export default SearchByIngredients;
