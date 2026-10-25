import { render, screen } from "@testing-library/react";
import Title from "./Title";

test("decorative title text is excluded from the heading's accessible name", () => {
  render(<Title title="Skills" span="skills" />);
  expect(screen.getByRole("heading", { level: 2, name: "Skills" })).toBeInTheDocument();
  expect(screen.getByText("skills", { exact: true })).toBeVisible();
});
