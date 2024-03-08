import { Meta, StoryObj } from "@storybook/react";
import Button from ".";
import { fireEvent, within } from "@storybook/test";

const meta = {
  title: "elements/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const NormalButton: Story = {
  args: {
    color: "black",
    children: "Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fireEvent.click(canvas.getByRole("button"));
  },
};

export const BlueButton: Story = {
  args: {
    color: "blue",
    children: "Button",
  },
};
