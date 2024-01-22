import { useState, useEffect } from "react";
import { API_ROOT } from "./config";
import { useAccount, useMsal } from "@azure/msal-react";

export interface Subject {
  id: string;
  name: string;
  lastDate: string;
}

export function useSubjects(): Subject[] | null {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] ?? {});
  const [subjects, setSubjects] = useState<Subject[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const SUBJECTS_ENDPOINT = `${API_ROOT}/me/subjects`;
    (async () => {
      if (!account) {
        return;
      }
      const tokenRes = await instance.acquireTokenSilent({
        scopes: ["User.Read"],
        account,
      });
      try {
        const response = await fetch(SUBJECTS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${tokenRes.accessToken}`,
          },
          signal,
        });
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
  }, [instance, account]);

  return subjects;
}
