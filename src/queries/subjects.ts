import { useState, useEffect } from "react";

export interface Subject {
  id: string;
  name: string;
  lastDate: string;
}

export function useSubjects(): Subject[] | null {
  const [subjects, setSubjects] = useState<Subject[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const SUBJECTS_ENDPOINT =
      "https://backend.mikuroxina.workers.dev/me/subjects";
    (async () => {
      try {
        const response = await fetch(SUBJECTS_ENDPOINT, { signal });
        if (!response.ok) {
          return;
        }
        const fetchedSubjects: Subject[] = await response.json();
        setSubjects(fetchedSubjects);
      } catch {}
    })();

    return () => {
      controller.abort();
    };
  }, []);
  return subjects;
}
