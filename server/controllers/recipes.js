import db from "../db/db-connection.js";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import cloudinary from "cloudinary";
import streamifier from "streamifier";
import axios from "axios";
import { prepareIngredients } from "../utils/recipeUtils.js";

// GET RECIPES BASED ON INGREDIENTS OR KEYWORD
export const getRecipes = async (req, res) => {
  const { ingredients, keyword, limit = 12, page = 1 } = req.query;

  const offset = (page - 1) * limit;

  let queryText = "SELECT * FROM recipes";
  let queryParams = [];

  // ADD FILTERS BASED ON INGREDIENTS OR KEYWORDS
  if (ingredients) {
    const ingredientsArray = ingredients.split(",");
    // @> compares the arrays and ensures that all ingredients in the DB are contained in the ingredientsArray
    queryText += " WHERE $1::text[] @> ingredients";
    queryParams = [ingredientsArray];
  }

  if (keyword) {
    queryText += " WHERE title ILIKE $1";
    queryParams = [`%${keyword}%`];
  }

  // QUERY RECIPES TO FIND TOTAL RECIPES
  const { rows: count } = await db.query(queryText, queryParams);
  const totalRecipes = count.length;

  // SET LIMIT AND OFFSET BASED ON QUERY PARAMS
  if (queryParams.length === 0) {
    queryText += " LIMIT $1 OFFSET $2";
  } else {
    queryText += " LIMIT $2 OFFSET $3";
  }

  queryParams.push(limit, offset);

  // QUERY RECIPES BASED ON LIMITS
  const { rows: recipes, rowCount } = await db.query(queryText, queryParams);

  // CHECK IF MORE RECIPES THAT HAVE NO BEEN LOADED BY CHECKING IF TOTALRECIPES > OFFSET + LENGTH OF CURRENT SEARCH
  const hasMore = totalRecipes > offset + recipes.length;

  const response = {
    status: "success",
    results: recipes.length,
    data: { recipes },
    page,
    hasMore,
  };

  res.status(StatusCodes.OK).json(response);
};

// GET SINGLE RECIPE
export const getRecipe = async (req, res) => {
  const { id } = req.params;
  // Validate the ID parameter
  if (!id || isNaN(id))
    throw new BadRequestError('Invalid or missing "id" parameter');

  // Query DB to get recipe with ID
  const { rows: recipe } = await db.query("SELECT * FROM recipes WHERE id=$1", [
    id,
  ]);

  // If recipe doesn't exist throw an error
  if (recipe.length === 0) throw new NotFoundError(`no recipe with id ${id}`);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: { recipe },
  });
};

// GET ALL OF THE LOGGED IN USER'S RECIPES
export const getUsersRecipes = async (req, res) => {
  const { userId } = req.user;
  // Query DB and get current user's recipes
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

// CREATE A NEW RECIPE
export const createRecipe = async (req, res) => {
  const { userId } = req.user;
  const { title, ingredients, instructions, prep_time, image_url } = req.body;

  // check if recipe is public or a user's
  const user_id = userId ? userId : null;
  const public_recipe = user_id !== null && false;

  // convert ingredients to string using utils function
  const ingredientsString = prepareIngredients(ingredients);

  const { rows: newRecipe } = await db.query(
    "INSERT INTO recipes (title, ingredients, instructions, prep_time, image_url, user_id, public_recipe) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [
      title,
      ingredientsString,
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

// EDIT A RECIPE
export const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, prep_time, image_url } = req.body;

  const ingredientsString = prepareIngredients(ingredients);

  const { rows: updatedRecipe } = await db.query(
    "UPDATE recipes SET (title, ingredients, instructions, prep_time, image_url) = ($1, $2, $3, $4, $5) WHERE id = $6 RETURNING *",
    [title, ingredientsString, instructions, prep_time, image_url, id]
  );

  res.status(StatusCodes.OK).json({
    status: "success",
    data: { updatedRecipe },
  });
};

// DELETE A RECIPE
export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM recipes WHERE id = $1", [id]);

  res.status(StatusCodes.OK).json({
    status: "success",
  });
};

// GET USERS BOOKMARKS
export const getUsersBookmarked = async (req, res) => {
  const { userId } = req.user;
  //Query DB to get user's bookmarked recipes
  const { rows: bookmarks } = await db.query(
    `SELECT recipes.* FROM bookmarked
       JOIN recipes ON bookmarked.recipe_id = recipes.id
       WHERE bookmarked.user_id = $1`,
    [userId]
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    results: bookmarks.length,
    data: { bookmarks },
  });
};

// BOOKMARK RECIPE
// CHECKS IF RECIPE ALREADY EXISTS IN BOOKMARKED TABLE. IF DOES, REMOVE, ELSE ADD
export const bookmarkRecipe = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  // Check if recipe has already been bookmarked by user
  try {
    const { rows: existingBookmark } = await db.query(
      "SELECT * FROM bookmarked WHERE user_id = $1 AND recipe_id = $2",
      [userId, id]
    );
    if (existingBookmark.length > 0) {
      await db.query(
        "DELETE FROM bookmarked WHERE user_id = $1 AND recipe_id = $2",
        [userId, id]
      );
      const { rows: updatedBookmarks } = await db.query(
        `SELECT recipes.* FROM bookmarked
       JOIN recipes ON bookmarked.recipe_id = recipes.id
       WHERE bookmarked.user_id = $1`,
        [userId]
      );

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "Recipe removed from bookmarks",
        data: { bookmarks: updatedBookmarks },
      });
    } else {
      await db.query(
        "INSERT INTO bookmarked (user_id, recipe_id) VALUES ($1, $2)",
        [userId, id]
      );

      const { rows: updatedBookmarks } = await db.query(
        `SELECT recipes.* FROM bookmarked
       JOIN recipes ON bookmarked.recipe_id = recipes.id
       WHERE bookmarked.user_id = $1`,
        [userId]
      );

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "Recipe added to bookmarks",
        data: { bookmarks: updatedBookmarks },
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

// GET RECIPE NUTRITION
export const getRecipeNutrition = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows: recipe } = await db.query(
      "SELECT * FROM recipes WHERE id=$1",
      [id]
    );

    if (recipe.length === 0) throw new NotFoundError(`no recipe with id ${id}`);

    // Prepare the title for spoonacular api request
    let title = recipe[0].title.replace(/ /g, "+");
    let apiKey = process.env.SPOONACULAR_API_KEY;

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/guessNutrition?apiKey=${apiKey}&title=${title}`
    );

    const recipeNutrition = response.data;
    res.status(StatusCodes.OK).json({
      status: "success",
      data: { recipeNutrition },
    });
  } catch (error) {
    console.error(error);
    if (error.response) {
      const { status, data } = error.response;
      res.status(status).json({ error: data });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Recipe not found" });
    }
  }
};

// Function to upload recipe image to memory storage on cloudinary
export const uploadRecipeImage = async (req, res) => {
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "No file provided" });
  }

  // Helper function to upload the file buffer to Cloudinary
  const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          use_filename: true,
          folder: "recipe-image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  };

  try {
    // Wait for the uploadToCloudinary function to resolve
    const result = await uploadToCloudinary(req.file.buffer);
    res.status(StatusCodes.OK).json({ secure_url: result.secure_url });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error uploading file to Cloudinary" });
  }
};
