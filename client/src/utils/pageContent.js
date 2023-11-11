import cooking from "../assets/cooking.png";
import bookmarkImg from "../assets/bookmark.png";
import noResults from "../assets/noresults.png";
export const pageContent = {
  personal: {
    text: "You Have Not Created Any Recipes",
    buttonText: "Create a Recipe",
    buttonLink: "/create",
    imageSrc: cooking,
    altText: "Cooking",
  },
  searchResults: {
    text: "No Recipes Found",
    buttonText: "Search For Recipes",
    buttonLink: "/search-ingredients",
    imageSrc: noResults,
    altText: "No Results",
  },
  bookmarked: {
    text: "You Have Not Bookmarked Any Recipes",
    buttonText: "Search For Recipes",
    buttonLink: "/search-ingredients",
    imageSrc: bookmarkImg,
    altText: "Bookmark",
  },
  noRecipe: {
    buttonText: "Back to Search",
    imageSrc: noResults,
    altText: "No Results",
  },
};
