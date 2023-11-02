import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

// Mock contexts
vi.mock("../../pages/Layouts/DashboardLayout", () => ({
  useDashboardContext: () => ({
    toggleSidebar: vi.fn(),
  }),
}));

vi.mock("../../context/appContext", () => ({
  useAppContext: () => ({
    logOutUser: vi.fn(),
    isAuthenticated: true,
  }),
}));

describe("Navbar Unit Test", () => {
  it("renders the navbar component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

    // Find all eelements tha thave a heading with name recipe ready
    const logoElements = screen.getAllByRole("heading", {
      name: /recipe ready/i,
    });

    // Take the first element of the array annd expect it to be in the document
    const logoElement = logoElements[0];

    expect(logoElement).toBeInTheDocument();
  });
});
