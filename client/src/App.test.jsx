import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Landing } from "./pages";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("should render title", () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    expect(screen.getByText(/Recipe Ready/i)).toBeInTheDocument();
  });
});
