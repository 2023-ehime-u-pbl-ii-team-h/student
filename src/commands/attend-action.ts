import { API_ROOT } from "@/queries/config";

import { useState, useCallback } from "react";

const ATTEND_API_ENDPOINT = `${API_ROOT}/attendances`;

export type AttendResult =
  | { type: "READY" }
  | { type: "SUBMITTING" }
  | { type: "SUCCESS"; response: Response }
  | { type: "FAILURE" };

export function useAttendAction(
  accessToken: string | null,
): [result: AttendResult, submit: () => Promise<void>] {
  const [result, setResult] = useState<AttendResult>({ type: "READY" });

  const submit = useCallback(async () => {
    if (!accessToken) {
      return;
    }
    setResult({ type: "SUBMITTING" });
    try {
      const response = await fetch(ATTEND_API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
      });
      if (!response.ok) {
        setResult({ type: "FAILURE" });
        return;
      }
      setResult({ type: "SUCCESS", response });
    } catch (error) {
      console.error(error);
      setResult({ type: "FAILURE" });
    }
  }, [accessToken]);

  return [result, submit];
}
