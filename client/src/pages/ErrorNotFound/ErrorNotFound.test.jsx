import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ErrorNotFound from "./ErrorNotFound";
// import everyting to use useRouteError and other hooks
import * as ReactRouter from "react-router-dom";

// Unit test to check if correct text renders on screen

// Mock useRouteError hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useRouteError: vi.fn(() => ({ status: 404 })),
  };
});

describe("ErrorNotFound", () => {
  it('renders "Oops! Page Not Found"', () => {
    ReactRouter.useRouteError.mockReturnValue({ status: 404 });

    render(
      <MemoryRouter>
        <ErrorNotFound />
      </MemoryRouter>
    );
    expect(screen.getByText("Oops! Page Not Found")).toBeInTheDocument();
  });

  it('renders "Something Went Wrong" for a non-404 error', () => {
    ReactRouter.useRouteError.mockReturnValue({});

    render(
      <MemoryRouter>
        <ErrorNotFound />
      </MemoryRouter>
    );

    // Check if "Something Went Wrong" is in the document
    expect(screen.getByText("Something Went Wrong")).toBeInTheDocument();
  });
});
