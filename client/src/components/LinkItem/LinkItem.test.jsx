import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LinkItem from "./LinkItem";

const linkText = "Create";
const linkTo = "/create";
const handleClick = vi.fn();

// Unit test for LinkItem to check that link is rendered and onClick is called when click
describe("LinkItem Component", () => {
  it("renders the link item and href", () => {
    render(
      <Router>
        <LinkItem to={linkTo}>{linkText}</LinkItem>
      </Router>
    );

    const linkElement = screen.getByText(linkText);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest("a")).toHaveAttribute("href", linkTo);
  });

  it("calls onClick when clicked", () => {
    render(
      <Router>
        <LinkItem to={linkTo} onClick={handleClick}>
          {linkText}
        </LinkItem>
      </Router>
    );

    const linkElement = screen.getByText(linkText);
    fireEvent.click(linkElement);
    expect(handleClick).toHaveBeenCalled();
  });
});
