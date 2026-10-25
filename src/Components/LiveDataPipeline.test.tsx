import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import LiveDataPipeline from "./LiveDataPipeline";
import { PIPELINE_EXAMPLES } from "../data/pipeline";

test("every pipeline stage opens its own definition and example", async () => {
  render(<LiveDataPipeline />);
  for (const stage of Object.values(PIPELINE_EXAMPLES)) {
    fireEvent.click(screen.getByRole("button", { name: stage.title }));
    const dialog = screen.getByRole("dialog", { name: stage.title });
    expect(dialog).toHaveTextContent(stage.definition);
    expect(dialog.querySelector("[data-example-kind]")).toHaveAttribute("data-example-kind", stage.example.kind);
    expect(dialog.querySelector("[data-example-kind]")).not.toBeEmptyDOMElement();
    fireEvent.click(screen.getByRole("button", { name: "Close example" }));
    await waitForElementToBeRemoved(dialog);
  }
});

test.each(["Enter", " "])("a pipeline stage can be opened with %s", async key => {
  render(<LiveDataPipeline />);
  fireEvent.keyDown(screen.getByRole("button", { name: "Events" }), { key });
  const dialog = screen.getByRole("dialog", { name: "Events" });
  expect(dialog).toHaveTextContent('"event": "cart.item_added"');
  fireEvent.click(screen.getByRole("button", { name: "Close example" }));
  await waitForElementToBeRemoved(dialog);
});
