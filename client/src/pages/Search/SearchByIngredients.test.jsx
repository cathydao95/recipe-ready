import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchByIngredients from "./SearchByIngredients";
// Mock the useAppContext hook
vi.mock("../../context/appContext", () => ({
  useAppContext: () => ({
    setIsLoading: vi.fn(),
  }),
}));

// Mock the useNavigate hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});
describe("SearchByIngredients Component", () => {
  it("renders correctly and submits form", async () => {
    render(
      <MemoryRouter>
        <SearchByIngredients />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/What Ingredients Do You Have?/i)
    ).toBeInTheDocument();

    const submitButton = screen.getByRole("button", {
      name: /Search For Recipes/i,
    });
    fireEvent.click(submitButton);
  });
});
