import styles from "./styles.module.scss";
import clsx from "clsx";
const AutocompleteList = ({
  suggestedList,
  selectedIngredients,
  handleAdd,
  selectedAutocomplete,
  handleKeyDown,
}) => {
  // Generate the list of autocomplete ingredients as divs
  const autocompleteList =
    suggestedList && suggestedList.length
      ? suggestedList.map((suggestedIng, index) => {
          return (
            <div
              key={index}
              className={clsx(
                styles.suggestedIng,
                // If current selectedAutocomplete is equal to the current index, add active clas
                selectedAutocomplete === index && styles.active
              )}
              // On click add the autocomplete ing
              onClick={() => handleAdd(suggestedIng)}
              // Handle key press to navigate and select autocomplete ing
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
            >
              {suggestedIng}
            </div>
          );
        })
      : null;

  return (
    <div className={styles.container}>
      <div className={suggestedList.length && styles.automatedListContainer}>
        {autocompleteList}
      </div>
    </div>
  );
};

export default AutocompleteList;
