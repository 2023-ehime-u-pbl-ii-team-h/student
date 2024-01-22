"use client";

import { useSubjects } from "@/queries/subjects";
import { useAttendAction, AttendResult } from "../commands/attend-action";
import { AttendButtonState } from "../organisms/attend-button";
import { AttendOutlet } from "@/organisms/attend-outlet";
import { useAttendancesSum } from "@/queries/attendances-sum";

const BUTTON_STATE_MAP: Record<AttendResult["type"], AttendButtonState> = {
  READY: "ENABLED",
  AWAITING: "DISABLED",
  SUCCESS: "DONE",
  FAILURE: "OVERTIME",
};

export function Content(): JSX.Element {
  const [attendResult, submitAttendAction] = useAttendAction();
  const attendState = BUTTON_STATE_MAP[attendResult.type];
  const subjects = useSubjects();
  const sum = useAttendancesSum(subjects ? subjects[0].id : "");

  return (
    <AttendOutlet
      onAttend={submitAttendAction}
      attendance={
        sum
          ? {
              attendanceCount: sum.onTime,
              tardinessCount: sum.late,
              absenceCount: sum.miss,
            }
          : undefined
      }
      attendState={attendState}
    />
  );
}
