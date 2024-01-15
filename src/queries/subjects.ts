export interface Subject {
  name: string;
  lastDate: string;
}

export function useSubjects(): Subject[] | null {
  const subjects = [
    { name: "PBL演習", lastDate: "2023-01-01" },
    { name: "サイバーセキュリティ", lastDate: "2023-01-02" },
    // その他の科目...
  ];
  return subjects;
}
