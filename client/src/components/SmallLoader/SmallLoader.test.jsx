import { render, screen } from "@testing-library/react";
import SmallLoader from "./SmallLoader";

// Unit test to check if small loader is loading
test("renders SmallLoader component", () => {
  // Render the SmallLoader component
  render(<SmallLoader />);

  // Ensure that the loading text is present
  const loadingText = screen.getByText("Loading...");
  expect(loadingText).toBeInTheDocument();
});
