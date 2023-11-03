import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import IngredientList from "./IngredientList";

describe("IngredientList Unit Test", () => {
  const mockIngList = [
    { name: "meats", examples: ["beef", "chicken"] },
    { name: "vegetables", examples: ["carrots", "broccoli"] },
  ];

  it("renders categories and checkboxes correctly", () => {
    render(
      <IngredientList
        ingList={mockIngList}
        selectedIngredients={[]}
        setSelectedIngredients={() => {}}
      />
    );

    // Check if categories are rendered
    expect(screen.getByText(/meats/i)).toBeInTheDocument();
    expect(screen.getByText(/vegetables/i)).toBeInTheDocument();

    // Check if checkboxes for ingredient items are rendered
    expect(screen.getByRole("checkbox", { name: /beef/i })).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /chicken/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /carrots/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /broccoli/i })
    ).toBeInTheDocument();
  });
});
