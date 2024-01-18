import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { API_ROOT } from "./config";
import { Subject } from "./subjects";

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
    const payload = (await res.json()) as {
      id: string;
      name: string;
      next_board_end: string | null;
      assigned: string[];
    }[];
    setSubjects(
      payload.map(({ id, name, next_board_end }) => ({
        id,
        name,
        lastDate: next_board_end ?? "",
      })),
    );
  }, BLOCK_DURATION);

  useEffect(() => {
    fetchSearch(input)?.catch(console.error);
    return () => {
      aborter.current?.abort();
    };
  }, [fetchSearch, input]);

  return subjects;
}
