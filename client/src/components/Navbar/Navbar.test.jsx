import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

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
  it("renders Navbar component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );
    // Query for heading with the text "Recipe Ready"
    const logoElements = screen.getAllByRole("heading", {
      name: /recipe ready/i,
    });
    const logoElement = logoElements[0]; // or whichever element you want to select
    expect(logoElement).toBeInTheDocument();
  });
});
