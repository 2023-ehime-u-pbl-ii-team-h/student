"use client";

import { useSubjects } from "@/queries/subjects";
import { useAttendAction, AttendResult } from "../commands/attend-action";
import { AttendButtonState } from "../molecules/attend-button";
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
  const boards = subjects?.flatMap((subject) =>
    subject.boards.map((board) => [subject, board] as const),
  );
  const nowSecs = Math.floor(Date.now() / 1000);
  const activeBoard = boards?.find(
    ([, { startFrom, secondsFromStartToBeLate, secondsFromBeLateToEnd }]) => {
      const startSecs = Math.floor(new Date(startFrom).getTime() / 1000);
      return (
        startSecs <= nowSecs &&
        nowSecs < startSecs + secondsFromStartToBeLate + secondsFromBeLateToEnd
      );
    },
  );
  const sum = useAttendancesSum(activeBoard ? activeBoard[0].id : "");

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
