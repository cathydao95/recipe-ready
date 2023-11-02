import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FormRow from "./FormRow";

describe("FormRow", () => {
  const mockHandleInput = vi.fn();

  it("renders input correctly", () => {
    render(
      <FormRow
        type="text"
        name="firstName"
        labelText="first name"
        handleInput={mockHandleInput}
        value="cathy"
      />
    );

    const inputElement = screen.getByPlaceholderText(/first name/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("name", "firstName");
    expect(inputElement).toHaveAttribute("id", "firstName");
    expect(inputElement).toHaveValue("cathy");
  });

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

    const inputElement = screen.getByPlaceholderText(/first name/i);
    fireEvent.change(inputElement, { target: { value: "new_value" } });
    expect(mockHandleInput).toHaveBeenCalled();
  });
});
