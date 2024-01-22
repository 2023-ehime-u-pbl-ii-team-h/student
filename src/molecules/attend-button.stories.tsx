import type { Meta, StoryObj } from "@storybook/react";

import AttendButton from "./attend-button";

export default {
  title: "molecules/attend button",
  component: AttendButton,
  argTypes: {
    state: {
      options: ["ENABLED", "DONE", "OVERTIME"],
      control: {
        type: "radio",
      },
    },
  },
} satisfies Meta<typeof AttendButton>;

type Story = StoryObj<typeof AttendButton>;

export const Primary: Story = {
  args: {
    state: "ENABLED",
  },
};
