import { render, screen } from "@testing-library/react";
import PipelineExample from "./PipelineExample";
import { PIPELINE_EXAMPLES } from "../data/pipeline";

test("analytics shows a dashboard with metrics, a readable chart, and an insight", () => {
  render(<PipelineExample example={PIPELINE_EXAMPLES.analytics.example} />);
  expect(screen.getByText("Sales dashboard")).toBeInTheDocument();
  expect(screen.getByText("Revenue")).toBeInTheDocument();
  expect(screen.getByText("$98,650")).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /Orders by day: Mon 120/ })).toHaveAccessibleName(/Sun 270/);
  expect(screen.getByText(/Weekend orders account for about 40%/)).toBeInTheDocument();
});

test("AI and ML show generation and prediction as distinct examples", () => {
  render(<PipelineExample example={PIPELINE_EXAMPLES.ai.example} />);
  expect(screen.getByRole("region", { name: "AI assistant example" })).toHaveTextContent("Customers like the battery life but want faster charging.");
  const prediction = screen.getByRole("region", { name: "Machine learning prediction example" });
  expect(prediction).toHaveTextContent("Past deliveries → trained model");
  expect(prediction).toHaveTextContent("120 km distance");
  expect(prediction).toHaveTextContent("Estimated delivery: 2 days");
});
