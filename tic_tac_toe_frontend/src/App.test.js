import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders and allows a couple moves", async () => {
  render(<App />);

  expect(screen.getByText("Tic Tac Toe")).toBeInTheDocument();
  expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();

  const user = userEvent.setup();
  const square1 = screen.getByRole("button", { name: /Square 1, empty/i });
  const square2 = screen.getByRole("button", { name: /Square 2, empty/i });

  await user.click(square1);
  expect(screen.getByText(/Next player: O/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Square 1, X/i })
  ).toBeInTheDocument();

  await user.click(square2);
  expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Square 2, O/i })
  ).toBeInTheDocument();
});
