import React from 'react';
import styles from './attendance-status.module.css';

export type AttendanceStatusProps = {
  onTime: number;
  late: number;
  miss: number;
};

const AttendanceStatus = ({ onTime, late, miss }: AttendanceStatusProps) => {
  return (
    <div className={styles.attendanceStatus}>
      <div className={styles.statusItem}>出席: {onTime} 回</div>
      <div className={styles.statusItem}>遅刻: {late} 回</div>
      <div className={styles.statusItem}>欠席: {miss} 回</div>
    </div>
  );
};

export default AttendanceStatus;
