import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DashboardContext } from "../../pages/Layouts/DashboardLayout";
import { AppContext } from "../../context/appContext";
import Sidebar from "./Sidebar";

describe("Sidebar Component Integration Test", () => {
  // // Create toggleSidebar and logOutUser mock functions
  let toggleSidebar;
  let logOutUser;

  // Run before each test
  beforeEach(() => {
    toggleSidebar = vi.fn();
    logOutUser = vi.fn();
  });

  // Checks to see if sidebar functionality toggles
  it("toggles the sidebar when the button is clicked", async () => {
    render(
      <BrowserRouter>
        <DashboardContext.Provider value={{ toggleSidebar }}>
          <AppContext.Provider value={{ logOutUser }}>
            <Sidebar />
          </AppContext.Provider>
        </DashboardContext.Provider>
      </BrowserRouter>
    );

    // Query the sidebar button by it's name
    const toggleButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(toggleButton);

    // Expect mock toggleSidebar function to be called once
    expect(toggleSidebar).toHaveBeenCalledTimes(1);
  });
});
