"use client";

import AttendStatus from "../molecules/attend-status";
import TopNavBar from "@/organisms/top-navigation-bar";
import styles from "./subject-attend.module.css";
import { useAttendancesSum } from "@/queries/attendances-sum";
import { useSearchParams } from "next/navigation";
import { useSubjects } from "@/queries/subjects";
import { useAccessToken } from "@/queries/access-token";
import { Outlet } from "@/app/outlet";

const SubjectAttend = () => {
  const queryParams = useSearchParams();
  const subjectId = queryParams.get("subject_id");
  const accessToken = useAccessToken();
  const { data: attendance } = useAttendancesSum(
    accessToken && subjectId
      ? {
          accessToken,
          subjectId,
        }
      : null,
  );
  const { data: subjects } = useSubjects(accessToken ? { accessToken } : null);
  const subjectName = subjects?.find(({ id }) => id === subjectId)?.name;

  return (
    <Outlet title={subjectName ?? "読み込み中…"}>
      <div className={styles.container}>
        {attendance ? (
          <AttendStatus
            attendanceCount={attendance.onTime}
            tardinessCount={attendance.late}
            absenceCount={attendance.miss}
          />
        ) : (
          <div className={`surface-variant-text body-medium ${styles.message}`}>
            科目データを読み込んでいます...
          </div>
        )}
      </div>
    </Outlet>
  );
};

export default SubjectAttend;
