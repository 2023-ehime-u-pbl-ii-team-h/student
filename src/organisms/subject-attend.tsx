import React, { useEffect, useState } from 'react';
import AttendanceStatus from '../molecules/attendance-status';
import { API_ROOT } from "@/queries/config";

export type SubjectAttendanceProps = {
  subjectId: string;
};

const SubjectAttendance = ({ subjectId }: SubjectAttendanceProps) => {
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const url = `${API_ROOT}/attendances/${subjectId}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setSubject({
            id: subjectId,
            name: '科目名',
            attendances: data,
          });
        } else {
          setSubject(null);
        }
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

export default SubjectAttendance;