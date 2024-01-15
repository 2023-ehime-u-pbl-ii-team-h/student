import { useState, useEffect } from "react";

export interface Subject {
  name: string;
  lastDate: string;
}

export function useSubjects(): Subject[] | null {
  const [subjects, setSubjects] = useState<Subject[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const SUBJECTS_ENDPOINT = "https://backend.mikuroxina.workers.dev/subjects";
    (async () => {
      try {
        const response = await fetch(SUBJECTS_ENDPOINT, { signal });
        if (!response.ok) {
          setSubjects(null);
          return;
        }
        const fetchedSubjects: Subject[] = await response.json();
        setSubjects(fetchedSubjects);
      } catch {
        setSubjects(null);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);
  return subjects;
}
