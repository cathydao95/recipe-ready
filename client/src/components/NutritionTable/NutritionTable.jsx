import styles from "./styles.module.scss";

// Display the nutrition information for recipes in a table format
const NutritionTable = ({ recipeNutrition }) => {
  return (
    <div className={styles.nutritionContainer}>
      <table className={styles.nutritionTable}>
        <thead>
          <tr>
            <th>Nutrition</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Calories</td>
            <td>
              {recipeNutrition.calories?.value} {recipeNutrition.calories?.unit}
            </td>
          </tr>
          <tr>
            <td>Carbs</td>
            <td>
              {recipeNutrition.carbs?.value} {recipeNutrition.carbs?.unit}
            </td>
          </tr>
          <tr>
            <td>Protein</td>
            <td>
              {recipeNutrition.protein?.value} {recipeNutrition.protein?.unit}
            </td>
          </tr>
          <tr>
            <td>Fat</td>
            <td>
              {recipeNutrition.fat?.value} {recipeNutrition.fat?.unit}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NutritionTable;
