import TopNavBar from "@/molecules/top-navigation-bar";
import { SubjectForm } from "@/organisms/subject-form";

export default function AddSubjectPage(): JSX.Element {
  return (
    <main>
      <TopNavBar label="受講科目の追加" />
      <SubjectForm />
    </main>
  );
}
