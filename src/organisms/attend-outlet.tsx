import TopNavBar, { TopNavBarProps } from "@/molecules/top-navigation-bar";
import AttendButton, { AttendButtonState } from "./attend-button";
import AttendStatus, { AttendanceProps } from "./attend-status";

export interface AttendOutletProps {
  subjects: TopNavBarProps["subjects"];
  attendState: AttendButtonState;
  attendance?: AttendanceProps;
  onAttend?: () => void;
}

export function AttendOutlet({
  subjects,
  attendState,
  attendance,
  onAttend,
}: AttendOutletProps): JSX.Element {
  return (
    <>
      <TopNavBar subjects={subjects} />
      <AttendButton state={attendState} onClick={onAttend} />
      {attendance && <AttendStatus {...attendance} />}
    </>
  );
}
