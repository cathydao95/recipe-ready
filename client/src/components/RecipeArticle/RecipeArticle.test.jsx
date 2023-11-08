import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipeArticle from "./RecipeArticle";

// Unit test to check if RecipeArticle component is rendering title and images
const mockRecipe = {
  id: 1,
  title: "Delicious Recipe",
  image_url: "url",
};

describe("RecipeArticle", () => {
  it("renders the RecipeArticle component correctly", () => {
    render(
      <MemoryRouter>
        <RecipeArticle recipe={mockRecipe} />
      </MemoryRouter>
    );

    // Check if the recipe title and image are rendered
    const recipeTitleElement = screen.getByText(mockRecipe.title);
    const recipeImageElement = screen.getByAltText(mockRecipe.title);

    // Assertions
    expect(recipeTitleElement).toBeInTheDocument();
    expect(recipeImageElement).toBeInTheDocument();
    expect(recipeImageElement).toHaveAttribute("src", mockRecipe.image_url);
  });
});
