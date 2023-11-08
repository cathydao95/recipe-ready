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

describe("<Create />", () => {
  useLocation.mockReturnValue({
    state: {},
  });

  it('displays "Create New Recipe" when not editing', () => {
    const { getByText } = render(<Create />);
    expect(getByText("Create New Recipe")).toBeInTheDocument();
  });

  it('displays "Edit Recipe" when editing', () => {
    useLocation.mockReturnValue({
      state: {
        isEditing: true,
        currentRecipeInfo: {
          id: "1",
          title: "Sample Recipe",
          ingredients: ["beef", "chicken", "fish"], //
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
