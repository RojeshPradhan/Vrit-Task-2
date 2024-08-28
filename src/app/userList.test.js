import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "./page";

global.fetch = jest.fn();

describe("UserList Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<UserList />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders user data correctly", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<UserList />);
    await waitFor(() =>
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument()
    );
  });

  it("handles error correctly when API fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to fetch users"));

    render(<UserList />);
    await waitFor(() =>
      expect(screen.getByText("Failed to fetch users")).toBeInTheDocument()
    );
  });
});
