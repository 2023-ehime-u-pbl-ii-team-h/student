import { useState, useEffect } from "react";

export type LoginInfo =
  | { type: "LOADING" }
  | { type: "NOT_LOGGED_IN" }
  | { type: "LOGGED_IN"; name: string; registrations: readonly string[] };

export function useLogin(): LoginInfo {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({ type: "LOADING" });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const ME_ENDPOINT = "https://backend.mikuroxina.workers.dev/me";
    (async () => {
      try {
        const response = await fetch(ME_ENDPOINT, { signal });
        if (!response.ok) {
          setLoginInfo({ type: "NOT_LOGGED_IN" });
          return;
        }
        const { name, registrations } = await response.json();
        setLoginInfo({ type: "LOGGED_IN", name, registrations });
      } catch {
        setLoginInfo({ type: "NOT_LOGGED_IN" });
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return loginInfo;
}
