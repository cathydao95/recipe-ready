import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Results from "./Results";
import { AppContext } from "../../context/appContext";

// mock react router dom
vi.mock("react-router-dom", () => ({
  useLocation: vi.fn().mockReturnValue({ state: {} }),
}));

describe("Results Component", () => {
  it("displays SmallLoader when results are not loaded", () => {
    // mock context and set resultsLoaded to false
    const mockContext = {
      getRecipes: vi.fn(),
      hasMore: false,
      recipeSearchResults: [],
      resultsLoaded: false,
    };

    // test that loader is rendering when resultsLoaded is false
    render(
      <AppContext.Provider value={mockContext}>
        <Results />
      </AppContext.Provider>
    );

    expect(screen.getByText(/.../i)).toBeInTheDocument();
  });
});
