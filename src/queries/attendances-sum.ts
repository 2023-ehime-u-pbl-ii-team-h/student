import { fetcher } from "@/queries/config";
import useSWR, { Fetcher } from "swr";

export type AttendancesSum = {
  onTime: number;
  late: number;
  miss: number;
};
export const useAttendancesSum = (
  props: {
    accessToken: string;
    subjectId: string;
  } | null,
) =>
  useSWR<AttendancesSum>(
    props
      ? [`/subjects/${props.subjectId}/all_attendances`, props.accessToken]
      : null,
    fetcher as Fetcher<AttendancesSum>,
  );
