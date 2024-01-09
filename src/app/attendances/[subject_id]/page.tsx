"use client";

import React, { useState, useEffect, useRef } from "react";

import TopNavBar from '../../../molecules/top-navigation-bar';
import AttendanceStatus from './attendance-status';

const AttendancePage = ({ subjectId }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [subjectName, setSubjectName] = useState('');


  useEffect(() => {
    const fetchSubjectName = async () => {
      const response = await fetch(`/api/subjects/${subjectId}`);
      const data = await response.json();
      setSubjectName(data.name);
    };

    const fetchAttendanceData = async () => {
      const response = await fetch(`/api/attendance/${subjectId}`);
      const data = await response.json();
      setAttendanceData(data);
    };

    fetchSubjectName();
    fetchAttendanceData();
  }, [subjectId]);

  return (
    <div>
      <TopNavBar label={subjectName} />
      <div>
        {attendanceData.length > 0 ? (
          attendanceData.map((data, index) => (
            <AttendanceStatus key={index} /* 出席情報のプロパティを渡す */ />
          ))
        ) : (
          <p>まだ講義が開かれていません。</p>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;