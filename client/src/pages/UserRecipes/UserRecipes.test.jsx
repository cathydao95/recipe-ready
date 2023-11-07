import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import UserRecipes from "./UserRecipes";
import { AppContext } from "../../context/appContext";

// Mocking AppContext
const mockGetPersonalRecipes = vi.fn();

const Wrapper = ({ children }) => (
  <AppContext.Provider
    value={{ usersRecipes: [], getPersonalRecipes: mockGetPersonalRecipes }}
  >
    {children}
  </AppContext.Provider>
);

// Unit test to check if getPersonalRecipes function is called when component is mounted
describe("UserRecipes", () => {
  beforeEach(() => {
    mockGetPersonalRecipes.mockReset();
  });

  it("calls getPersonalRecipes", () => {
    render(<UserRecipes />, { wrapper: Wrapper });

    expect(mockGetPersonalRecipes).toHaveBeenCalled();
  });
});
