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

    fetch("EPH-60のエンドポイントURL", { signal })
      .then(response => response.json())
      .then(data => {
        if (data.isLoggedIn) {
          setLoginInfo({ type: 'LOGGED_IN', name: data.name });
        } else {
          setLoginInfo({ type: 'NOT_LOGGED_IN' });
        }
      })
      .catch(() => setLoginInfo({ type: 'NOT_LOGGED_IN' }));

    return () => {
      controller.abort();
    };
  }, []);

  return loginInfo;
}
