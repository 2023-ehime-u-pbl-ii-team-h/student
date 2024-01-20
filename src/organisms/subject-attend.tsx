import { useEffect, useState } from 'react';
import AttendanceStatus from '../molecules/attendance-status';
import { API_ROOT } from "@/queries/config";
import { useSearchParams } from "next/navigation";

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
          setSubject(data);
        } catch (error) {
          console.error('科目データの取得に失敗しました:', error);
        }
      };
  
      fetchSubjectData();
    }, [subjectId]);
  
    if (!subject) {
      return <div className={styles.message}>科目データを読み込んでいます...</div>;
    }
  
    if (!subject.id) {
      return <div className={styles.message}>科目が見つかりませんでした。</div>;
    }
  
    return (
      <div>
        <AttendanceStatus onTime={subject.attendances.on_time} late={subject.attendances.late} miss={subject.attendances.miss} />
      </div>
    );
  };
  
  export default SubjectAttend;