import { SubjectForm } from "@/organisms/subject-form";
import { Outlet } from "../outlet";

export default function AddSubjectPage(): JSX.Element {
  return (
    <Outlet title="受講科目の追加">
      <SubjectForm />
    </Outlet>
  );
}
