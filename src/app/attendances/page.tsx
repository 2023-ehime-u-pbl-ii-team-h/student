import TopNavBar from "@/molecules/top-navigation-bar";
import SubjectAttend from "@/organisms/subject-attend";

const AttendancesPage = () => {
  return (
    <main>
      <TopNavBar label="科目名" />
      <SubjectAttend />
    </main>
  );
};

export default AttendancesPage;
