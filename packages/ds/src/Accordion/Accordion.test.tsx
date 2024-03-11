import { render } from "@testing-library/react";
import Accordion from ".";

jest.mock("@ui-blocks/common", () => ({
  join: () => "",
}));

it("should render", () => {
  render(<Accordion />);
});
