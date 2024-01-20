import { useEffect, useState } from "react";
import { API_ROOT } from "@/queries/config";

export type AttendancesSum = {
  onTime: number;
  late: number;
  miss: number;
};

export const useAttendancesSum = (subjectId: string): AttendancesSum | null => {
  const [attendance, setAttendance] = useState<AttendancesSum | null>(null);
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

  return attendance;
};
