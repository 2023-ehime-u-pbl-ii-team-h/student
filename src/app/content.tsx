"use client";

import { useAttendAction, AttendResult } from "../commands/attend-action";
import { AttendButtonState } from "../organisms/attend-button";
import { AttendOutlet } from "@/organisms/attend-outlet";

const BUTTON_STATE_MAP: Record<AttendResult["type"], AttendButtonState> = {
  READY: "ENABLED",
  AWAITING: "ENABLED", // FIXME: AttendButtonState に "DISABLED" を追加すべき
  SUCCESS: "DONE",
  FAILURE: "OVERTIME",
};

export function Content(): JSX.Element {
  const [attendResult, submitAttendAction] = useAttendAction();
  const attendState = BUTTON_STATE_MAP[attendResult.type];
  const subjects = [
    { name: "PBL演習", lastDate: "2023-01-01" },
    { name: "サイバーセキュリティ", lastDate: "2023-01-02" },
    // その他の科目...
  ];

  return (
    <AttendOutlet
      onAttend={submitAttendAction}
      attendance={{
        attendanceCount: 14,
        tardinessCount: 13,
        absenceCount: 2,
      }}
      {...{ attendState, subjects }}
    />
  );
}
