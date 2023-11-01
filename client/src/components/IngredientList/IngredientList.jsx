import styles from "./styles.module.scss";
import { ingList } from "../../utils/ingList";

const IngredientList = ({ selectedIngredients, setSelectedIngredients }) => {
  // On checked, add ingredient to selectedIngredients, else remove
  const addToIngredientsList = (selectedIng) => {
    // If ingredient is not already included in list, add
    if (!selectedIngredients.includes(selectedIng)) {
      setSelectedIngredients((prev) => [...prev, selectedIng]);
    } else {
      // If ingredient is already in list, remove by filtering
      setSelectedIngredients((prev) =>
        prev.filter((ing) => ing !== selectedIng)
      );
    }
  };

  return (
    <div className={styles.listContainer}>
      {ingList.map((category, index) => {
        const { name, examples } = category;
        return (
          <div key={name}>
            <h5 key={index} className={styles.category}>
              {name}
            </h5>
            {examples.map((ing) => {
              return (
                <div key={ing}>
                  <input
                    key={ing}
                    type="checkbox"
                    id={ing}
                    name={ing}
                    value={ing}
                    onChange={(e) => addToIngredientsList(e.target.value)}
                  />
                  <label htmlFor={ing} className={styles.ingItem}>
                    {ing}
                  </label>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default IngredientList;
