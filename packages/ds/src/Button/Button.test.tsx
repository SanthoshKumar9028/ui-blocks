import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from ".";

it("should pass", () => {
  expect(1).toBe(1);
});

it("should pass 1", () => {
  render(<Button color="red">Red button</Button>);
  expect(screen.getByText("Red button")).toBeInTheDocument();
});
