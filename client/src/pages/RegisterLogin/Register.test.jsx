import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import { AppProvider } from "../../context/appContext";

// Helper function to render the component
const renderRegister = () => {
  render(
    <MemoryRouter>
      <AppProvider>
        <Register />
      </AppProvider>
    </MemoryRouter>
  );
};

describe("Register Component", () => {
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
