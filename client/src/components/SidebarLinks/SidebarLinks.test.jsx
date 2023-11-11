import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SidebarLinks from "./SidebarLinks";

// Integration test for SidebarLinks Component
describe("SidebarLinks Component", () => {
  const mockLinks = [
    { to: "/personal", text: "personal", onClick: vi.fn() },
    { to: "/create", text: "create", onClick: vi.fn() },
  ];

  it("renders sidebar category text and link", () => {
    render(
      <Router>
        <SidebarLinks category="collection" links={mockLinks} />
      </Router>
    );

    expect(screen.getByText("collection")).toBeInTheDocument();

    mockLinks.forEach((link) => {
      expect(screen.getByText(link.text)).toBeInTheDocument();
      expect(screen.getByText(link.text).closest("a")).toHaveAttribute(
        "href",
        link.to
      );
    });
  });
});
