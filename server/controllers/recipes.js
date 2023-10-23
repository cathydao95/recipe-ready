import db from "../db/db-connection.js";
import "dotenv/config";

export const getRecipes = async (req, res) => {
  try {
    const { rows: recipes } = await db.query("SELECT * FROM recipes");
    res.status(200).json({
      status: "success",
      results: recipes.length,
      data: { recipes },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows: recipe } = await db.query(
      "SELECT * FROM recipes WHERE id=$1",
      [id]
    );
    res.status(200).json({
      status: "success",
      data: { recipe },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const {} = req.body;

    const { rows: newRecipe } = await db.query(
      "INSERT INTO recipes (title, ingredients, instructions, prep_time, image_url, user_id, public) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      []
    );
    res.status(200).json({
      status: "success",
      data: { newRecipe },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const {} = req.body;

    const { rows: updatedRecipe } = await db.query(
      "UPDATE recipes SET (title, ingredients, instructions, prep_time, image_url user_id, public) = ($1, $2, $3, $4, $5, $6, $7) WHERE id = $8 RETURNING *",
      []
    );
    res.status(200).json({
      status: "success",
      data: { updatedRecipe },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await db.query("DELETE FROM recipes WHERE id = $1", [
      id,
    ]);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
