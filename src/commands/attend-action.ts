import { API_ROOT } from "@/queries/config";
import { useAccount, useMsal } from "@azure/msal-react";
import { useState, useCallback } from "react";

const ATTEND_API_ENDPOINT = `${API_ROOT}/attendances`;

export type AttendResult =
  | { type: "READY" }
  | { type: "AWAITING" }
  | { type: "SUCCESS"; response: Response }
  | { type: "FAILURE" };

export function useAttendAction(): [
  result: AttendResult,
  submit: () => Promise<void>,
] {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] ?? {});
  const [result, setResult] = useState<AttendResult>({ type: "READY" });

  const submit = useCallback(async () => {
    setResult({ type: "AWAITING" });
    if (!account) {
      return;
    }
    const tokenRes = await instance.acquireTokenSilent({
      scopes: ["User.Read"],
      account,
    });
    try {
      const response = await fetch(ATTEND_API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${tokenRes.accessToken}`,
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
  }, [instance, account]);

  return [result, submit];
}
