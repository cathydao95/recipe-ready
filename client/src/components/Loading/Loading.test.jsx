import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

// Unit test to check if loading spinner rendered
describe("Loading Component", () => {
  it("renders the loading spinner", () => {
    render(<Loading />);

    const loadingElement = screen.getByTestId("loadingSpinner");
    expect(loadingElement).toBeInTheDocument();
  });
});
