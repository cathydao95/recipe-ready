import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchByIngredients from "./SearchByIngredients";

// mock context and functions
vi.mock("../../context/appContext", () => ({
  useAppContext: () => ({
    setIsLoading: vi.fn(),
  }),
}));

// mock react-router-dom to control navigation
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// test to check if component renders and submits the form
describe("SearchByIngredients Unit and Integration Test", () => {
  it("renders correctly and submits form", async () => {
    render(
      <MemoryRouter>
        <SearchByIngredients />
      </MemoryRouter>
    );

    // assertion to check heading text
    expect(
      screen.getByText(/What Ingredients Do You Have?/i)
    ).toBeInTheDocument();

    // Find submit button by name and role
    const submitButton = screen.getByRole("button", {
      name: /Search For Recipes/i,
    });
    // simulate a click event
    fireEvent.click(submitButton);
  });
});
