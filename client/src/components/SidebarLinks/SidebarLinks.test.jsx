import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SidebarLinks from "./SidebarLinks";
import { BrowserRouter as Router } from "react-router-dom";

// Integration test to test if SidebarLinks Components renders the links from theLinkItem component
describe("SidebarLinks Componentt", () => {
  it("renders links and category correctly", () => {
    const mockLinks = [
      { to: "/personal", text: "personal", onClick: vi.fn() },
      { to: "/create", text: "create", onClick: vi.fn() },
    ];
    const mockCategory = "Collection";

    render(
      <Router>
        <SidebarLinks category={mockCategory} links={mockLinks} />
      </Router>
    );

    //  expect cateogry to be rendered
    expect(screen.getByText(mockCategory)).toBeInTheDocument();

    // expect LinkItems to be rendered
    mockLinks.forEach((link) => {
      expect(screen.getByText(link.text)).toBeInTheDocument();

      // expect that clicking on clinks calls the onClick function
      const linkElement = screen.getByText(link.text);
      fireEvent.click(linkElement);
      expect(link.onClick).toHaveBeenCalled();
    });
  });
});
