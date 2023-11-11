import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Bookmarked from "./Bookmarked";

// Unit test to check if small loader component is rendering when results are not loaded
// mock the context
vi.mock("../../context/appContext", async () => {
  const mockContext = await vi.importActual("../../context/appContext");
  return {
    ...mockContext,
    useAppContext: vi.fn(() => ({
      usersBookmarked: [],
      resultsLoaded: false,
    })),
  };
});

describe("Bookmarked Component", () => {
  it("renders the SmallLoader when results are not loaded", async () => {
    render(<Bookmarked />);

    expect(await screen.findByTestId("smallLoader")).toBeInTheDocument();
  });
});
