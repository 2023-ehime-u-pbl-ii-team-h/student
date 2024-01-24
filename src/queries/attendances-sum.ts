import { API_ROOT } from "@/queries/config";
import useSWR, { Fetcher } from "swr";

export type AttendancesSum = {
  onTime: number;
  late: number;
  miss: number;
};

const fetcher: Fetcher<
  AttendancesSum,
  { accessToken: string; subjectId: string }
> = ({ accessToken, subjectId }) =>
  fetch(`${API_ROOT}/subjects/${subjectId}/all_attendances`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json() as Promise<AttendancesSum>);

export const useAttendancesSum = (
  props: {
    accessToken: string;
    subjectId: string;
  } | null,
) => useSWR(props, fetcher);
