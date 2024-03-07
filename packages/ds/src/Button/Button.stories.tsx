import { Meta, StoryObj } from "@storybook/react";
import Button from ".";

const meta = {
  title: "elements/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const NormalButton: Story = {
  args: {
    color: "black",
    children: "Button"
  },
};

export const BlueButton: Story = {
  args: {
    color: "blue",
    children: "Button"
  },
};
