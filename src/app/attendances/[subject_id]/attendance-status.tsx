import React from 'react';
import styles from './AttendanceStatus.module.css';
import { FaCheck, FaTimes, FaClock } from 'react-icons/fa';

const AttendanceStatus = ({ status, lectureNumber, date }) => {
  
const getStatusIcon = () => {
    switch (status) {
      case '出席':
        return <FaCheck />;
      case '遅刻':
        return <FaClock />;
      case '欠席':
        return <FaTimes />;
      default:
        return null;
    }
  };
  return (
    <div className="attendanceStatus">
      <div className="icon">{getStatusIcon()}</div>
      <div className="lectureNumber">第 {lectureNumber} 回</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
    </div>
  );
};

export default AttendanceStatus;