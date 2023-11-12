import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DashboardContext } from "../../pages/Layouts/DashboardLayout";
import { AppContext } from "../../context/appContext";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router } from "react-router-dom";

// Sidebar Integration test to test if the correct SidebarLinks are being rendered depdning if user is authetnicated or not
describe("Sidebar Component Test", () => {
  const mockToggleSidebar = vi.fn();

  const renderSidebarWithMocks = (isAuthenticated) => {
    render(
      <Router>
        <AppContext.Provider value={{ isAuthenticated, logOutUser: vi.fn() }}>
          <DashboardContext.Provider
            value={{ showSidebar: true, toggleSidebar: mockToggleSidebar }}
          >
            <Sidebar />
          </DashboardContext.Provider>
        </AppContext.Provider>
      </Router>
    );
  };

  it("renders correct links for authenticated users", () => {
    renderSidebarWithMocks(true);

    // Check for links specific to authenticated users
    expect(screen.getByText("Create New Recipe")).toBeInTheDocument();
    expect(screen.getByText("Personal Recipes")).toBeInTheDocument();
    expect(screen.getByText("Bookmarked Recipes")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("renders correct links for unauthenticated users", () => {
    renderSidebarWithMocks(false);

    // Check for links specific to unauthenticated users
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
