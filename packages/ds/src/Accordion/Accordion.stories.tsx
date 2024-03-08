import { Meta, StoryObj } from "@storybook/react";
import { within, fireEvent, expect } from "@storybook/test";
import Accordion from ".";

const meta = {
  title: "elements/Accordion",
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Standard: Story = {
  args: {
    title: "Accordion title",
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat eum rerum distinctio qui nam, necessitatibus voluptate accusamus inventore aut assumenda amet ex voluptatem nihil odio earum omnis quidem reiciendis esse!",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByText("Lorem", { exact: false })).not.toBeInTheDocument();

    await fireEvent.click(canvas.getByRole("button"));

    expect(canvas.queryByText("Lorem", { exact: false })).toBeInTheDocument();

    await fireEvent.click(canvas.getByRole("button"));

    expect(canvas.queryByText("Lorem", { exact: false })).not.toBeInTheDocument();
  },
};
