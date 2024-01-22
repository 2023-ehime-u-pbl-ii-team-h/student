import type { Meta, StoryObj } from "@storybook/react";

import TopNavBar from "./top-navigation-bar";

export default {
  title: "organisms/top navigation bar",
  component: TopNavBar,
} satisfies Meta<typeof TopNavBar>;

type Story = StoryObj<typeof TopNavBar>;

export const Normal: Story = {
  args: {
    label: "ホーム",
  },
};
