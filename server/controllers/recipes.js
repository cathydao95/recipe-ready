import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export const getRecipes = async (req, res) => {
  const { rows: recipes } = await db.query("SELECT * FROM recipes");
  res.status(StatusCodes.OK).json({
    status: "success",
    results: recipes.length,
    data: { recipes },
  });
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

export const createRecipe = async (req, res) => {
  const {
    title,
    ingredients,
    instructions,
    prep__time,
    image_url,
    public_recipe,
  } = req.body;

  // testing public (figure out how to default public)
  const { rows: newRecipe } = await db.query(
    "INSERT INTO recipes (title, ingredients, instructions, prep_time, image_url, public) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, ingredients, instructions, prep__time, image_url, public_recipe]
  );

  // private
  // const { rows: newRecipe } = await db.query(
  //   "INSERT INTO recipes (title, ingredients, instructions, prep_time, image_url, user_id, public) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
  //   []
  // );
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: { newRecipe },
  });
};

export const editRecipe = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    ingredients,
    instructions,
    prep__time,
    image_url,
    public_recipe,
  } = req.body;

  const { rows: updatedRecipe } = await db.query(
    "UPDATE recipes SET (title, ingredients, instructions, prep_time, image_url, public) = ($1, $2, $3, $4, $5, $6) WHERE id = $7 RETURNING *",
    [title, ingredients, instructions, prep__time, image_url, public_recipe, id]
  );

  if (updatedRecipe.length === 0)
    throw new NotFoundError(`no recipe with id ${id}`);
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
  console.log(deletedRecipe);
  if (deletedRecipe.length === 0)
    throw new NotFoundError(`no recipe with id ${id}`);
  res.status(StatusCodes.OK).json({
    status: "success",
  });
};

export const getRecipeNutrition = async (req, res) => {
  // send back ID and use ID to find recipe and grab title
  // LOOK INTO URL ENCODED
  // const { title } = req.query;
  // let queryTitle = title.replace(/ /g, "+");
  // try {
  //   const response = await fetch(
  //     `https://api.spoonacular.com/recipes/guessNutrition?apiKey=${process.env.SPOONACULAR_API_KEY}&title=${queryTitle}`
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
