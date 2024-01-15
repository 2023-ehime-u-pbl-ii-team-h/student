import TopNavBar from "@/molecules/top-navigation-bar";
import AttendButton, { AttendButtonState } from "./attend-button";
import AttendStatus, { AttendanceProps } from "./attend-status";

export interface AttendOutletProps {
  attendState: AttendButtonState;
  attendance?: AttendanceProps;
  onAttend?: () => void;
}

export function AttendOutlet({
  attendState,
  attendance,
  onAttend,
}: AttendOutletProps): JSX.Element {
  return (
    <>
      <TopNavBar />
      <AttendButton state={attendState} onClick={onAttend} />
      {attendance && <AttendStatus {...attendance} />}
    </>
  );
}
