import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { API_ROOT } from "./config";

export type Subject = {
  id: string;
  name: string;
  next_board_end: string | null;
  assigned: string[];
};

const BLOCK_DURATION = 500;

export function useSubjectSearch(input: string): readonly Subject[] | null {
  const aborter = useRef<AbortController | null>(null);
  const [subjects, setSubjects] = useState<Subject[] | null>(null);

  const fetchSearch = useDebouncedCallback(async (input: string) => {
    setSubjects(null);
    aborter.current?.abort();
    aborter.current = new AbortController();
    const params = new URLSearchParams({
      name: input,
    });
    const res = await fetch(`${API_ROOT}/subjects?` + params, {
      signal: aborter.current.signal,
    });
    if (!res.ok) {
      console.error(await res.text());
      return;
    }
    const payload = await res.json();
    setSubjects(payload as Subject[]);
  }, BLOCK_DURATION);

  useEffect(() => {
    fetchSearch(input)?.catch(console.error);
    return () => {
      aborter.current?.abort();
    };
  }, [fetchSearch, input]);

  return subjects;
}
