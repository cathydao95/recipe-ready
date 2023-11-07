import React from "react";
import styles from "./styles.module.scss";
import { FaRegCheckSquare } from "react-icons/fa";

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
    <div className={styles.wrapper}>
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
    </div>
  );
};

export default SelectedIngredientsList;
