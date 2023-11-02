import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "../../context/appContext";
import Create from "./Create";

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ msg: "Recipe created!" }),
  })
);

describe("Create Component Integration Test", () => {
  it("submits the form and calls the API", async () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <Create />
        </AppProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: "Recipe title" },
    });
    fireEvent.change(screen.getByPlaceholderText(/ingredients/i), {
      target: { value: "Ingredients" },
    });
    fireEvent.change(screen.getByPlaceholderText(/instructions/i), {
      target: { value: "Instructions" },
    });
    fireEvent.change(screen.getByPlaceholderText(/prep time/i), {
      target: { value: "30" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(fetch).toHaveBeenCalled();
  });
});
