import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SelectedIngredientsList from "./SelectedIngredientsList";

// Unit test to test if selected ingredients are rendered
describe("SelectedIngredientsList", () => {
  it("renders the selected ingredients", () => {
    const selectedIngredients = ["Chicken", "Beef", "Fish"];

    render(
      <SelectedIngredientsList
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={vi.fn()}
      />
    );

    // Check if selected ingredients are displayed
    selectedIngredients.forEach((ingredient) => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });
  });
});
