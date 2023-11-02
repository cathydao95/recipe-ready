import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import { AppProvider } from "../../context/appContext";

const renderRegister = () => {
  render(
    <MemoryRouter>
      <AppProvider>
        <Register />
      </AppProvider>
    </MemoryRouter>
  );
};
// Unit test to check if form elements are rendered
describe("Register Component Unit Test", () => {
  it("renders the register form elements", () => {
    renderRegister();

    // Check if form elements are rendered
    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});
