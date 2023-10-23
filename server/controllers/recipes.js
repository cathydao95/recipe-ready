import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

// export const getRecipes = async (req, res) => {
//   const { ingredients } = req.query;
//   console.log("INGREDIENTS", ingredients);

//   if (ingredients) {
//     const ingredientsArray = ingredients.split(",");

//     const query = `
//       SELECT * FROM recipes
//         WHERE
//           $1::text[] @> ingredients
//       `;

//     const { rows: recipes } = await db.query(query, [ingredientsArray]);

//     res.status(StatusCodes.OK).json({
//       status: "success",
//       results: recipes.length,
//       data: { recipes },
//     });
//   } else {
//     const { rows: recipes } = await db.query("SELECT * FROM recipes");
//     res.status(StatusCodes.OK).json({
//       status: "success",
//       results: recipes.length,
//       data: { recipes },
//     });
//   }
// };

export const getRecipes = async (req, res) => {
  const { ingredients } = req.query;

  let queryText = "SELECT * FROM recipes";
  let queryParams = [];

  if (ingredients) {
    const ingredientsArray = ingredients.split(",");
    queryText += " WHERE $1::text[] @> ingredients";
    queryParams = [ingredientsArray];
  }

  const { rows: recipes } = await db.query(queryText, queryParams);

  const response = {
    status: "success",
    results: recipes.length,
    data: { recipes },
  };

  res.status(StatusCodes.OK).json(response);
};

export const getRecipe = async (req, res) => {
  const { id } = req.params;
  const { rows: recipe } = await db.query("SELECT * FROM recipes WHERE id=$1", [
    id,
  ]);
  if (recipe.length === 0) throw new NotFoundError(`no recipe with id ${id}`);
  res.status(StatusCodes.OK).json({
    status: "success",
    data: { recipe },
  });
};
export const getUsersRecipes = async (req, res) => {
  const { userId } = req.user;
  const { rows: recipes } = await db.query(
    "SELECT * FROM recipes WHERE user_id = $1",
    [userId]
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    results: recipes.length,
    data: { recipes },
  });
};
export const createRecipe = async (req, res) => {
  const { userId } = req.user;
  console.log(userId);
  const { title, ingredients, instructions, prep_time, image_url } = req.body;
  const user_id = userId ? userId : null;
  const public_recipe = user_id !== null && false;
  console.log(user_id, public_recipe);
  const { rows: newRecipe } = await db.query(
    "INSERT INTO recipes (title, ingredients, instructions, prep_time, image_url, user_id, public_recipe) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [
      title,
      ingredients,
      instructions,
      prep_time,
      image_url,
      user_id,
      public_recipe,
    ]
  );
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: { newRecipe },
  });
};
export const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, prep_time, image_url } = req.body;
  const { rows: updatedRecipe } = await db.query(
    "UPDATE recipes SET (title, ingredients, instructions, prep_time, image_url) = ($1, $2, $3, $4, $5) WHERE id = $6 RETURNING *",
    [title, ingredients, instructions, prep_time, image_url, id]
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    data: { updatedRecipe },
  });
};
export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { rows: deletedRecipe } = await db.query(
    "DELETE FROM recipes WHERE id = $1",
    [id]
  );
  res.status(StatusCodes.OK).json({
    status: "success",
  });
};
export const getRecipeNutrition = async (req, res) => {
  // LOOK INTO URL ENCODED
  // const { id } = req.params;
  // console.log(id);
  // const { rows: recipe } = await db.query("SELECT * FROM recipes WHERE id=$1", [
  //   id,
  // ]);
  // let title = recipe[0].title;
  // title = title.replace(/ /g, "+");
  // try {
  //   const response = await fetch(
  //     `https://api.spoonacular.com/recipes/guessNutrition?apiKey=${process.env.SPOONACULAR_API_KEY}&title=${title}`
  //   );
  //   const recipeNutrition = await response.json();
  //   res.status(StatusCodes.OK).json({
  //     status: "success",
  //     data: { recipeNutrition },
  //   });
  // } catch (error) {
  //   console.error;
  //   return res.status(400).json({ error });
  // }
};
