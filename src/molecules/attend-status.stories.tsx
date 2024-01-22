import type { Meta, StoryObj } from "@storybook/react";

import AttendStatus from "./attend-status";

export default {
  title: "molecules/attend status",
  component: AttendStatus,
} satisfies Meta<typeof AttendStatus>;

type Story = StoryObj<typeof AttendStatus>;

export const Normal: Story = {
  args: {
    attendanceCount: 11,
    tardinessCount: 2,
    absenceCount: 1,
  },
};
