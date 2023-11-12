import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FormRow from "./FormRow";

// Integration test for Form Row because it is testing the input value and validating prop, in addition to checking if the input has the correct attributes and text.
describe("FormRow", () => {
  // create mock function for handling input
  const mockHandleInput = vi.fn();

  it("renders the form input correctly", () => {
    render(
      <FormRow
        type="text"
        name="firstName"
        labelText="first name"
        handleInput={mockHandleInput}
        value="cathy"
      />
    );

    // query input element with first name text and check that its in the document and has the correct type attributes
    const inputElement = screen.getByPlaceholderText(/first name/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("name", "firstName");
    expect(inputElement).toHaveAttribute("id", "firstName");
    expect(inputElement).toHaveValue("cathy");
  });

  // Test that handleInput is called when value changes
  it("calls handleInput on input change", () => {
    render(
      <FormRow
        type="text"
        name="firstName"
        labelText="first name"
        handleInput={mockHandleInput}
        value="cathy"
      />
    );

    // query input element with first name text
    const inputElement = screen.getByPlaceholderText(/first name/i);
    // simulate a change to a new value
    fireEvent.change(inputElement, { target: { value: "new_value" } });
    // expect mock functinon was called
    expect(mockHandleInput).toHaveBeenCalled();
  });
});
