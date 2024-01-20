"use client";

import { useEffect, useState } from "react";
import { API_ROOT } from "@/queries/config";
import { useSearchParams } from "next/navigation";
import styles from "./subject-attend.module.css";
import AttendStatus from "./attend-status";
import { useSubjects } from "@/queries/subjects";
import TopNavBar from "@/molecules/top-navigation-bar";

type AttendancesSum = {
  onTime: number;
  late: number;
  miss: number;
};

const SubjectAttend = () => {
  const queryParams = useSearchParams();
  const subjectId = queryParams.get("subject_id");
  const [attendance, setAttendance] = useState<AttendancesSum | null>(null);
  const subjects = useSubjects();
  const subjectName = subjects?.find(({ id }) => id === subjectId)?.name;

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const url = `${API_ROOT}/subjects/${subjectId}/all_attendances`;
        const response = await fetch(url);
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as AttendancesSum;
        setAttendance(data);
      } catch (error) {
        console.error("科目データの取得に失敗しました:", error);
      }
    };

    fetchSubjectData();
  }, [subjectId]);

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
