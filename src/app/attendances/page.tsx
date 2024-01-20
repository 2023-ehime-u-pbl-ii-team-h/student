import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TopNavBar from '../molecules/top-navigation-bar';
import AttendanceStatus from '../molecules/attendance-status';
import styles from './attendances.module.css';

const AttendancesPage = () => {
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subject_id');
  const [subject, setSubject] = useState(null);


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
    return (
      <div className={styles.message}>
        科目が見つかりませんでした。
        {/* ホーム画面へのリンク */}
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <TopNavBar label={subject.name} />
      <AttendanceStatus onTime={subject.attendances.on_time} late={subject.attendances.late} miss={subject.attendances.miss} />
    </main>
  );
};

export default AttendancesPage;