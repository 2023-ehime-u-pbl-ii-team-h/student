import { useState, useEffect } from 'react';

export type LoginInfo =
  | { type: 'LOADING' }
  | { type: 'NOT_LOGGED_IN' }
  | { type: 'LOGGED_IN'; name: string };

export function useLogin(): LoginInfo {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({ type: 'LOADING' });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const ME_ENDPOINT = "https://backend.mikuroxina.workers.dev/me";
    (async () => {
      try {
        const response = await fetch(ME_ENDPOINT, { signal });
        if (!response.ok) {
          setLoginInfo({ type: 'NOT_LOGGED_IN' });
          return;
        }
        const { name } = await response.json();      
        setLoginInfo({ type: 'LOGGED_IN', name });
      } catch {
        setLoginInfo({ type: 'NOT_LOGGED_IN' });
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return loginInfo;
}
