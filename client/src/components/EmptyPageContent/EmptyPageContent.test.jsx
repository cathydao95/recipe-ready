import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import EmptyPageContent from "./EmptyPageContent";

// Create mock data
const cooking = "cooking-placeholder-image-url";
const noResults = "no-results-placeholder-image-url";

const mockPageContent = {
  personal: {
    text: "You Have Not Created Any Recipes",
    buttonText: "Create a Recipe",
    buttonLink: "/create",
    imageSrc: cooking,
    altText: "Cooking",
  },
  noRecipe: {
    text: "Recipe Not Found",
    buttonText: "Back to Search",
    imageSrc: noResults,
    altText: "No Results",
  },
};

// EmptyPageContent Unit test
// expect corect page information to be rendered depending on page passed
describe("EmptyPageContent", () => {
  it("should render EmptyPageContent with the correct text for noRecipe page", () => {
    render(
      <MemoryRouter>
        <EmptyPageContent page="noRecipe" />
      </MemoryRouter>
    );
  });

  it("should render EmptyPageContent with the correct text for Personal Recipes page", () => {
    render(
      <MemoryRouter>
        <EmptyPageContent page="personal" />
      </MemoryRouter>
    );
  });
});
