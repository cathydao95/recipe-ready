import React from "react";
import { render } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import Create from "./Create";

// Unit test to check if correct title is displayed dpending on editing mode

// create mock for react router dom
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn(),
  useLocation: vi.fn(),
}));

// Mmck useAppContext
vi.mock("../../context/appContext", () => ({
  useAppContext: vi.fn(() => ({ setResultsLoaded: vi.fn() })),
}));

describe("<Create />", () => {
  it('displays "Create New Recipe" when not in editing mode', () => {
    vi.mocked(useLocation).mockReturnValue({
      state: {},
    });

    const { getByText } = render(<Create />);
    expect(getByText("Create New Recipe")).toBeInTheDocument();
  });

  it('displays "Edit Recipe" when in editing mode', () => {
    vi.mocked(useLocation).mockReturnValue({
      state: {
        isEditing: true,
        currentRecipeInfo: {
          id: "1",
          title: "Chicken",
          ingredients: ["beef", "chicken", "fish"],
          instructions: "Grill",
          prep_time: "45",
          image_url: "url",
        },
      },
    });

    const { getByText } = render(<Create />);
    expect(getByText("Edit Recipe")).toBeInTheDocument();
  });
});
