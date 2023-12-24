import type { Meta, StoryObj } from "@storybook/react";

import AccountMenu from "./account-menu";

export default {
  title: "molecules/account menu",
  component: AccountMenu,
} satisfies Meta<typeof AccountMenu>;

type Story = StoryObj<typeof AccountMenu>;

export const NotLoggedIn: Story = {
  args: {
    user: null,
  },
};

export const LoggedIn: Story = {
  args: {
    user: {
      name: "TEST Student",
      initials: "TS",
    },
  },
};
