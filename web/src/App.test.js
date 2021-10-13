import React from "react";

// Libraries
import { render, screen } from "@testing-library/react";

// Components
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
