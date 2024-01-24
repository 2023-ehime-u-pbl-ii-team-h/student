import SubjectAttend from "@/organisms/subject-attend";
import { Suspense } from "react";

const AttendancesPage = () => {
  return (
    <Suspense fallback={<p className="body-medium">読み込み中…</p>}>
      <SubjectAttend />
    </Suspense>
  );
};

export default AttendancesPage;
