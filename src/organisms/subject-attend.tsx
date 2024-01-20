import { useEffect, useState } from 'react';
import AttendanceStatus from '../molecules/attendance-status';
import { API_ROOT } from "@/queries/config";
import { useSearchParams } from "next/navigation";
import styles from '../molecules/attendance-status.module.css';

type AttendancesSum = {
  onTime: number;
  late: number;
  miss: number;
};

const SubjectAttend = () => {
    const queryParams = useSearchParams();
    const subjectId = queryParams.get('subject_id');
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
          console.error('科目データの取得に失敗しました:', error);
        }
      };
  
      fetchSubjectData();
    }, [subjectId]);
  
    if (!attendance) {
      return <div className={styles.message}>科目データを読み込んでいます...</div>;
    }
  
    return (
      <div>
        <AttendanceStatus onTime={attendance.onTime} late={attendance.late} miss={attendance.miss} />
      </div>
    );
  };
  
  export default SubjectAttend;