import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "../../pages/index";

describe("App", () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Welcome to Supa-Hiro/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
