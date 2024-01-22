import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { API_ROOT } from "./config";
import { useAccount, useMsal } from "@azure/msal-react";

const BLOCK_DURATION = 500;

export type PartialSubject = {
  id: string;
  name: string;
  next_board_end: string | null;
  assigned: string[];
};

export function useSubjectSearch(
  input: string,
): readonly PartialSubject[] | null {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] ?? {});
  const aborter = useRef<AbortController | null>(null);
  const [subjects, setSubjects] = useState<PartialSubject[] | null>(null);

  const fetchSearch = useDebouncedCallback(async (input: string) => {
    if (!account) {
      return;
    }

    setSubjects(null);
    aborter.current?.abort();
    aborter.current = new AbortController();

    const tokenRes = await instance.acquireTokenSilent({
      scopes: ["User.Read"],
      account,
    });

    const params = new URLSearchParams({
      name: input,
    });
    let payload;
    try {
      const res = await fetch(`${API_ROOT}/subjects?` + params, {
        headers: {
          Authorization: `Bearer ${tokenRes.accessToken}`,
        },
        signal: aborter.current.signal,
      });
      if (res.status === 404) {
        setSubjects([]);
        return;
      }
      if (!res.ok) {
        throw new Error(await res.text());
      }
      payload = (await res.json()) as {
        id: string;
        name: string;
        next_board_end: string | null;
        assigned: string[];
      }[];
    } catch (error) {
      console.error(error);
      return;
    }
    setSubjects(payload);
  }, BLOCK_DURATION);

  useEffect(() => {
    fetchSearch(input)?.catch(console.error);
    return () => {
      aborter.current?.abort();
    };
  }, [fetchSearch, input]);

  return subjects;
}
