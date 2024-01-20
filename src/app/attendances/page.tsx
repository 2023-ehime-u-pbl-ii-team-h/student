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

  if (!subjectId) {
    return <div className={styles.message}>科目IDが指定されていません。</div>;
  }

  return (
    <main className={styles.main}>
      <TopNavBar label="科目名" /> {}
      <SubjectAttend subjectId={subjectId} />
    </main>
  );
};

export default AttendancesPage;