"use client";

import { useSubjects } from "@/queries/subjects";
import { useAttendAction, AttendResult } from "../commands/attend-action";
import { useAttendancesSum } from "@/queries/attendances-sum";
import AttendButton, { AttendButtonState } from "../molecules/attend-button";
import AttendStatus, { AttendanceProps } from "../molecules/attend-status";

const BUTTON_STATE_MAP: Record<AttendResult["type"], AttendButtonState> = {
  READY: "ENABLED",
  SUBMITTING: "SUBMITTING",
  SUCCESS: "DONE",
  FAILURE: "OVERTIME",
};

export function AttendOutlet(): JSX.Element {
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
  const attendance: AttendanceProps | undefined = sum
    ? {
        attendanceCount: sum.onTime,
        tardinessCount: sum.late,
        absenceCount: sum.miss,
      }
    : undefined;

  if (!subjects) {
    return (
      <div>
        <p className="body-medium">受講している科目がありません</p>
        <p className="body-medium">左上のメニューから科目を追加しましょう</p>
      </div>
    );
  }
  if (!activeBoard) {
    return (
      <div>
        <p className="body-medium">現在開講している科目はありません</p>
      </div>
    );
  }
  return (
    <>
      <AttendButton state={attendState} onClick={submitAttendAction} />
      <p className="body-medium">出席受付中: {activeBoard[0].name}</p>
      <p className="body-medium">
        {new Date(activeBoard[1].startFrom).toLocaleTimeString()} から
      </p>
      {attendance && <AttendStatus {...attendance} />}
    </>
  );
}
