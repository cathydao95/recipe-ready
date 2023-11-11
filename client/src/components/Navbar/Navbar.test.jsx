import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

// Mock dashboard and app contexts
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
  it("renders the navbar component checkss that the logos are present ", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );

    const logoElements = screen.getAllByAltText("Recipe Ready Logo");
    expect(logoElements.length).toBeGreaterThan(0);
  });
});
