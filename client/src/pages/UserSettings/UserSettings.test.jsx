import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import UserSettings from "./UserSettings";
import { AppContext } from "../../context/appContext";

// Unit test for UserSettings Component
const mockGetCurrentUser = vi.fn();
const mockCurrentUser = [
  { first_name: "Cathy", last_name: "Dao", email: "cathydao@gmail.com" },
];

const wrapper = ({ children }) => (
  <AppContext.Provider
    value={{ getCurrentUser: mockGetCurrentUser, currentUser: mockCurrentUser }}
  >
    {children}
  </AppContext.Provider>
);

describe("UserSettings Component", () => {
  it("displays user information in the form", async () => {
    render(<UserSettings />, { wrapper });

    await waitFor(() => {
      const firstNameInput = screen.getByPlaceholderText("First Name");
      expect(firstNameInput.value).toBe("Cathy");

      const lastNameInput = screen.getByPlaceholderText("Last Name");
      expect(lastNameInput.value).toBe("Dao");

      const emailInput = screen.getByPlaceholderText("Email");
      expect(emailInput.value).toBe("cathydao@gmail.com");
    });
  });
});
