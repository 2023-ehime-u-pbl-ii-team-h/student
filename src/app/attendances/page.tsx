import SubjectAttend from "@/organisms/subject-attend";
import { Suspense } from "react";

const AttendancesPage = () => {
  return (
    <main>
      <Suspense fallback={<p className="body-medium">読み込み中…</p>}>
        <SubjectAttend />
      </Suspense>
    </main>
  );
};

export default AttendancesPage;
