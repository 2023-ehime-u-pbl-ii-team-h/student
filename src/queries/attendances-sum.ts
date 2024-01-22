import { useEffect, useState } from "react";
import { API_ROOT } from "@/queries/config";
import { useAccount, useMsal } from "@azure/msal-react";

export type AttendancesSum = {
  onTime: number;
  late: number;
  miss: number;
};

export const useAttendancesSum = (subjectId: string): AttendancesSum | null => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] ?? {});
  const [attendance, setAttendance] = useState<AttendancesSum | null>(null);

  useEffect(() => {
    const aborter = new AbortController();

    const fetchSubjectData = async () => {
      if (!account) {
        return;
      }
      const tokenRes = await instance.acquireTokenSilent({
        scopes: ["User.Read"],
        account,
      });
      if (aborter.signal.aborted) {
        return;
      }
      const url = `${API_ROOT}/subjects/${subjectId}/all_attendances`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${tokenRes.accessToken}`,
        },
        signal: aborter.signal,
      });
      if (!response.ok || aborter.signal.aborted) {
        return;
      }

      const data = (await response.json()) as AttendancesSum;
      setAttendance(data);
    };
    fetchSubjectData().catch(console.error);

    return () => {
      aborter.abort();
    };
  }, [instance, account, subjectId]);

  return attendance;
};
