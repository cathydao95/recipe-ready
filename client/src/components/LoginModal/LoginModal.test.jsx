import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import LoginModal from "./LoginModal";

// Integration test becasue it checks the interaction between the LoginModal in the Router when button is clicked
describe("LoginModal", () => {
  it("displays the modal when showLogin is true", () => {
    const mockContext = {
      showLogin: true,
      setShowLogin: vi.fn(),
    };

    render(
      <BrowserRouter>
        <AppContext.Provider value={mockContext}>
          <LoginModal />
        </AppContext.Provider>
      </BrowserRouter>
    );

    // Check for the title of the modal
    expect(screen.getByText(/Want to save this recipe?/i)).toBeInTheDocument();
  });

  it("should close the modal when the close button is clicked", () => {
    const setShowLogin = vi.fn();
    const contextValue = {
      showLogin: true,
      setShowLogin,
    };

    render(
      <BrowserRouter>
        <AppContext.Provider value={contextValue}>
          <LoginModal />
        </AppContext.Provider>
      </BrowserRouter>
    );

    // simulate user click
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    //verify setShowLogin to be false
    expect(setShowLogin).toHaveBeenCalledWith(false);
  });
});
