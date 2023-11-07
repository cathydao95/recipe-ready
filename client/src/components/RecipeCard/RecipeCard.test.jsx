import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipeCard from "./RecipeCard";

// Mock the useAppContext hook
vi.mock("../../context/appContext", () => ({
  useAppContext: vi.fn(() => ({
    deleteRecipe: vi.fn(),
    usersBookmarked: [],
    handleBookmarkClick: vi.fn(),
    setShowLogin: vi.fn(),
  })),
}));

// Unit test to check if recipe title is rendered
describe("RecipeCard", () => {
  const recipe = {
    id: "1",
    title: "Chicken Alfredo",
    prep_time: "45",
    user_id: "1",
    image_url: "url",
  };

  it("renders the recipe title", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} page="home" />
      </MemoryRouter>
    );

    expect(screen.getByText(/chicken alfredo/i)).toBeInTheDocument();
  });
});
