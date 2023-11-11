import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NutritionTable from "./NutritionTable";

// Unit test for NutritionTable
// mock nutrition info
const MockRecipeComponent = () => {
  const mockNutrition = {
    calories: { value: "100", unit: "calories" },
    carbs: { value: "15", unit: "g" },
    protein: { value: "25", unit: "g" },
    fat: { value: "10", unit: "g" },
  };

  return <NutritionTable recipeNutrition={mockNutrition} />;
};

describe("NutritionTable Component", () => {
  it("renders nutrition data passed from recipe component", () => {
    render(<MockRecipeComponent />);

    expect(screen.getByText("Calories").closest("td")).toBeInTheDocument();
    expect(screen.getByText("100 calories").closest("td")).toBeInTheDocument();
    expect(screen.getByText("Carbs").closest("td")).toBeInTheDocument();
    expect(screen.getByText("15 g").closest("td")).toBeInTheDocument();
    expect(screen.getByText("Protein").closest("td")).toBeInTheDocument();
    expect(screen.getByText("25 g").closest("td")).toBeInTheDocument();
    expect(screen.getByText("Fat").closest("td")).toBeInTheDocument();
    expect(screen.getByText("10 g").closest("td")).toBeInTheDocument();
  });
});
