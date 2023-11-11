import React from "react";
import styles from "./styles.module.scss";
import { FaRegCheckSquare } from "react-icons/fa";

// Render selected ingredients in a list
const SelectedIngredientsList = ({
  selectedIngredients,
  setSelectedIngredients,
}) => {
  const handleIngredientClick = (ingredientToRemove) => {
    const updatedIngredients = selectedIngredients.filter(
      (ing) => ing !== ingredientToRemove
    );
    setSelectedIngredients(updatedIngredients);
  };
  return (
    <div className={styles.selectedContainer}>
      {selectedIngredients.map((ing) => (
        <div
          key={ing}
          className={styles.selectedIng}
          onClick={() => handleIngredientClick(ing)}
        >
          <FaRegCheckSquare className={styles.icon} />
          {ing}
        </div>
      ))}
    </div>
  );
};

export default SelectedIngredientsList;
