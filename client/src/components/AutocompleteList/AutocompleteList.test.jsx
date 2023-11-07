import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AutocompleteList from "./AutocompleteList";

// Integration test for AutocompleteList because it also checks how the component behaves with clicks in addition to checking if suggestions are displayed
describe("AutocompleteList", () => {
  it("displays autocompleted suggestions and handles what is selected", () => {
    const suggestedList = ["Chicken", "Beef", "Fish"];

    // Create a mock function for handleAdd
    const handleAdd = (ing) => {
      console.log(`Adding ingredient: ${ing}`);
    };

    // render the autocomplete list
    render(
      <AutocompleteList
        suggestedList={suggestedList}
        selectedIngredients={[]}
        handleAdd={handleAdd}
        selectedAutocomplete={-1}
        handleKeyDown={vi.fn()}
      />
    );

    // check that suggestions are displayed
    const suggestedIngredients = screen.getAllByTestId(
      "autocompleteSuggestion"
    );
    expect(suggestedIngredients).toHaveLength(suggestedList.length);

    // Simulate clicks
    userEvent.click(suggestedIngredients[0]);
    console.log("Clicked on the first suggestion");

    userEvent.click(suggestedIngredients[1]);

    console.log("Clicked on the second suggestion");

    userEvent.click(suggestedIngredients[2]);

    console.log("Clicked on the third suggestion");
  });
});
