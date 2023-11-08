import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ResultsLayout from "./ResultsLayout";
import { AppContext } from "../../context/appContext";

// Unit test to check if title is rendered
// Mocking AppContext
const mockContext = {
  resultsLoaded: true,
  usersBookmarked: [],
  setShowLogin: vi.fn(),
};

describe("ResultsLayout", () => {
  it("renders the title", () => {
    const mockTitle = "Recipe Results";
    const mockRecipes = [
      {
        id: 1,
        title: "Chicken Alfredo",
        prep_time: 45,
        user_id: 1,
        image_url: "url",
      },
    ];
    render(
      <MemoryRouter>
        <AppContext.Provider value={mockContext}>
          <ResultsLayout
            recipes={mockRecipes}
            title={mockTitle}
            page="results"
          />
        </AppContext.Provider>
      </MemoryRouter>
    );

    // Check if title is in the document
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });
});
