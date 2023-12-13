import { useState, useCallback } from "react";

const ATTNED_API_ENDPOINT = "https://backend.mikuroxina.workers.dev/attendance";

export type AttendResult =
  | { type: "READY" }
  | { type: "AWAITING" }
  | { type: "SUCCESS"; response: Response }
  | { type: "FAILURE" };

export function useAttendAction() {
  const [result, setResult] = useState<AttendResult>({ type: "READY" });

  const submit = useCallback(async () => {
    setResult({ type: "AWAITING" });
    try {
      const response = await fetch(ATTNED_API_ENDPOINT, { method: "POST" });
      if (!response.ok) {
        setResult({ type: "FAILURE" });
        return;
      }
      setResult({ type: "SUCCESS", response });
    } catch (error) {
      console.error(error);
      setResult({ type: "FAILURE" });
    }
  }, [result]);

  return [result, submit];
}
