"use client";

import AttendStatus from "../molecules/attend-status";
import TopNavBar from "@/organisms/top-navigation-bar";
import styles from "./subject-attend.module.css";
import { useAttendancesSum } from "@/queries/attendances-sum";
import { useSearchParams } from "next/navigation";
import { useSubjects } from "@/queries/subjects";

const SubjectAttend = () => {
  const queryParams = useSearchParams();
  const subjectId = queryParams.get("subject_id");
  const attendance = useAttendancesSum(subjectId ?? "");
  const { data: subjects } = useSubjects();
  const subjectName = subjects?.find(({ id }) => id === subjectId)?.name;

  return (
    <>
      <TopNavBar label={subjectName} />
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
    </>
  );
};

export default SubjectAttend;
