import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TopNavBar from '../molecules/top-navigation-bar';
import AttendanceStatus from '../molecules/attendance-status';
import SubjectAttend from '../organisms/subject-attend';
import styles from './attendances.module.css';
import { API_ROOT } from "@/queries/config";

const AttendancesPage = () => {
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subject_id');

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