import TopNavBar from '../molecules/top-navigation-bar';
import AttendanceStatus from '../molecules/attendance-status';
import SubjectAttend from '../organisms/subject-attend';

const AttendancesPage = () => {
  return (
    <main className={styles.main}>
      <TopNavBar label="科目名" />
      <SubjectAttend />
    </main>
  );
};

export default AttendancesPage;