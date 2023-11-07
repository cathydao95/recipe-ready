import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
const AutocompleteList = ({
  suggestedList,
  setSelectedIngredients,
  selectedIngredients,
  handleAdd,
}) => {
  const autocompleteList =
    suggestedList && suggestedList.length
      ? suggestedList.map((suggestedIng, index) => {
          return (
            <div
              key={index}
              className={styles.suggestedIng}
              onClick={() => handleAdd(suggestedIng)}
            >
              {suggestedIng}
            </div>
          );
        })
      : null;

  console.log(autocompleteList);
  return (
    <div className={styles.container}>
      <div className={suggestedList.length && styles.automatedListContainer}>
        {autocompleteList}
      </div>
    </div>
  );
};

export default AutocompleteList;
