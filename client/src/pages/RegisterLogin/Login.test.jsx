import { describe, it, expect } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { AppProvider } from "../../context/appContext";

const renderLogin = () => {
  render(
    <MemoryRouter>
      <AppProvider>
        <Login />
      </AppProvider>
    </MemoryRouter>
  );
};
// Unit test to check if form elements are rendered
describe("Login Component Unit Test", () => {
  it("renders the login form elements", () => {
    renderLogin();
    // Check if form elements are rendered
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});
