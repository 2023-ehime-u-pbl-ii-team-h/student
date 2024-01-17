import { API_ROOT } from "@/queries/config";
import { useState, useCallback } from "react";

const ATTEND_API_ENDPOINT = `${API_ROOT}/attendance`;

export type AttendResult =
  | { type: "READY" }
  | { type: "AWAITING" }
  | { type: "SUCCESS"; response: Response }
  | { type: "FAILURE" };

export function useAttendAction(): [
  result: AttendResult,
  submit: () => Promise<void>,
] {
  const [result, setResult] = useState<AttendResult>({ type: "READY" });

  const submit = useCallback(async () => {
    setResult({ type: "AWAITING" });
    try {
      const response = await fetch(ATTEND_API_ENDPOINT, { method: "POST" });
      if (!response.ok) {
        setResult({ type: "FAILURE" });
        return;
      }
      setResult({ type: "SUCCESS", response });
    } catch (error) {
      console.error(error);
      setResult({ type: "FAILURE" });
    }
  }, []);

  return [result, submit];
}
