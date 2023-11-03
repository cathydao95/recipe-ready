import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import LoginModal from "./LoginModal";

describe("LoginModal Integration Test", () => {
  it("displays the modal when showLogin is true", () => {
    const mockContextValue = {
      showLogin: true,
      setShowLogin: vi.fn(),
    };

    render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <LoginModal />
        </AppContext.Provider>
      </BrowserRouter>
    );

    //  Check for modal's title
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
